// This is pinned since we're doing all this manual manipulation of the nodes
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10.9.0/dist/mermaid.esm.min.mjs'; 
mermaid.initialize({ securityLevel: 'loose' });
mermaid.run({
    querySelector: 'pre.mermaid',
    postRenderCallback: (id) => {
        const current = document.getElementById(id);

        const outer = current.closest('.mermaid-outer');
        if(!outer) {
            return;
        }

        const scrollNode = (node) => {
            node?.scrollIntoView({
                behavior: 'auto',
                block: 'center',
                inline: 'center',
            });
        }

        const hashScroll = () => {
            const hash = window.location.hash.slice(4);
            const node = current.querySelector('.mm-' + hash);

            if(!window.location.hash.startsWith('#mm-') || !node) {
                scrollNode(current.querySelector('.section-root'));
                window.scroll(0,0);
                return;
            }

            scrollNode(node);
        };

        window.addEventListener('hashchange', hashScroll);
        hashScroll();

        let isDrag = false;
        let wasDragged = false;

        // https://stackoverflow.com/a/77104729
        const pointerScroll = (elem) => {

            const dragStart = () => {
                wasDragged = false; 
                isDrag = true;
            };
            const dragEnd = () => {
                isDrag = false;
            };
            const drag = (ev) => {
                ev.stopPropagation();
                ev.preventDefault();
                if(!isDrag) {
                    return;
                }
                wasDragged = true;
                elem.scrollLeft -= ev.movementX;
                elem.scrollTop -=ev.movementY;
            };
            
            elem.addEventListener("pointerdown", dragStart);
            addEventListener("pointerup", dragEnd);
            addEventListener("pointermove", drag);
        };

        pointerScroll(outer);

        const nodes = outer.querySelectorAll('.mindmap-node');
        for(const node of nodes) {
            const mmClass = Array.from(node.classList).find(x => x.startsWith('mm-'));
            if(mmClass) {
                // This creates a permalink to the node, which is jumped to by the hashscroll function
                const nodeLinkIcon = document.createElement('i');
                nodeLinkIcon.setAttribute('aria-hidden', 'true');
                nodeLinkIcon.classList.add('fa', 'fa-link');
                const nodeLink =  document.createElement('a');
                nodeLink.href = "#" + mmClass;
                nodeLink.appendChild(nodeLinkIcon);
                const nodeLinkContainer = document.createElementNS("http://www.w3.org/2000/svg", 'foreignObject');
                nodeLinkContainer.setAttribute('width', '60');
                nodeLinkContainer.setAttribute('height', '60');
                nodeLinkContainer.setAttribute('right', '0');
                nodeLinkContainer.setAttribute('bottom', '0');
                nodeLinkContainer.appendChild(nodeLink);
                node.appendChild(nodeLinkContainer);
            }
            else {
                console.log(node.textContent, 'is unlinkable');
            }

            const urlParts = [];
            const urlSpans = [];
            const tspans = node.querySelectorAll('tspan');
            let found = false;
            for(const tspan of tspans) {
                if(tspan.querySelector('tspan')) {
                    continue;
                }

                try {
                    const content = tspan.textContent?.trim() ?? '';
                    if(!found) {
                        if(!content.includes('://')) {
                            continue;
                        }
                        new URL(content);
                        found = true;
                    }
                    urlParts.push(content);
                    urlSpans.push(tspan);
                }
                catch {}

            }

            if(!urlParts.length) {
                continue;
            }

            const anchor = document.createElementNS("http://www.w3.org/2000/svg", 'a');
            anchor.onclick = (e) => {
                if(!wasDragged) {
                    return;
                }

                e.preventDefault();
                e.stopPropagation();
            };
            anchor.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", urlParts.join(''));
            anchor.setAttribute("target", '_blank');
            node.parentNode.insertBefore(anchor, node);
            anchor.appendChild(node);
            for(const urlSpan of urlSpans) {
                urlSpan.remove();
            }
        }
    },
});