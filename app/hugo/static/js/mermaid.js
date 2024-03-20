import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
mermaid.initialize({ securityLevel: 'loose' });
mermaid.run({
    querySelector: 'pre.mermaid',
    postRenderCallback: (id) => {
        document.querySelector('.section-root')?.scrollIntoView(true);
        const outer = document.getElementById(id).closest('.mermaid-outer');
        if(!outer) {
            return;
        }
        document.querySelector('.entry__content').scroll(0,0);
        window.scroll(0,0);
        outer.scrollTop -= outer.clientHeight / 2;
        outer.scrollLeft += outer.clientWidth / 2;

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
            console.log(urlParts);

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