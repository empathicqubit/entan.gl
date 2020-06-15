---
title: "Commodore Update: Worst Year Edition"
date: 2020-06-15T14:58:37-04:00
draft: false
post-guide: |
    Useful shortcodes:

    {{< gcs_img src="path relative to static bucket root" >}}

    <a href="{{<gcs src="path relative to static bucket root" >}}">Test GCS link</a>

    {{< cbm >}} Commodore logo bc why not?
---

🎵 When it was 2020,

it was a very meh yeeeeearrrr,

it was a very meh year, for C64 hacks, and massive depression and quarantines and isolation and protests...

<!--more-->

...but you probably aren't interested in most of that. I've been trying to keep myself distracted from the negative things this year by doing some more work with my C64. I haven't been too focused on anything in particular lately, so I haven't made any progress on the game I was trying to write, I've mostly gotten sucked into writing a [Visual Studio Code](https://code.visualstudio.com/) debugger for [CC65](https://github.com/cc65/cc65)-compiled projects, which works halfway decently. The extension is designed to compile your C64 project using a build command, then run the result in a Commodore 64 emulator called [VICE](https://vice-emu.sourceforge.io/), while giving you a graphical interface to view variable values and step through the program one line at a time, or with breakpoints. [You can find it on the extension store](https://marketplace.visualstudio.com/items?itemName=entan-gl.cc65-vice) if you're interested in trying that out.

I'm not going to talk to much about how to use the debugger here, since you should be able to figure that out from the extension store page, but please let me know if anything is unclear!

I decided to write the debugger extension in TypeScript, since that is what the VSCode template project started out with. Typically I hate interpreted languages stacked on top of JavaScript, I really prefer using JavaScript directly, especially now with fairly wide support for `async`, classes and `let`/`const`, but TypeScript really makes sense here. Writing anything with complicated business logic really shouldn't be done in a language so loose as plain Javascript. It makes tracing bugs extremely difficult. Having compile-time type and null checking is almost a requirement.

In the process of building this I ran into some shortcomings that were challenging to resolve. In order to remotely control the VICE emulator, I needed to talk with it over a text-based network connection, which is a command line designed for human beings. Because it was formatted for humans, it's challenging to get data out of it and put it into VSCode. Also, since it was meant to handle commands in a sequential order, you can't send groups of commands at once and easily get the results from them. It's hard to tell where the response for one command ends and the next one begins.

In addition, I wanted the user to have access to this console, in case they wanted to do something lower level that my debugger couldn't. Since the debugger's commands are interleaved with the user's on the same connection, sometimes the user's input will break the debugger, and sometimes the debugger's output will appear in the user's console, which may be confusing.

There is one command in VICE that is meant to work around this issue, which lets you dump blocks of memory from the emulator in a binary format. The problem is that this isn't the only thing a debugger needs to do with the machine. It also needs to track the CPU registers and currently executing instruction of the program, as well as stop at points in the program requested by the user.

To solve some of these problems I added a currently unreleased feature to VICE, which you can test out if you download one of the Windows nightlies or build from source. The command line options to activate it are `-binarymonitor` and `-binarymonitoraddress`. The new feature adds a dedicated connection for debuggers. Since all the commands are in a simple binary format, it's easier for other software to process the responses, even if they come through out of order, since they have identifiers now. No searching the output for the prompt text to know that it's safe to send the next command, and no having to worry about interfering with the user console, since they're completely separate now.

## My game

I got stuck developing my game since I'm not a very creative person, but my idea was about a character from a dead webcomic that used to read, [Manly Guys Doing Manly Things](https://thepunchlineismachismo.com/archives/comic/06282010). His name is Canadian Guy, and he's an amalgamation of macho Canadian stereotypes. I haven't come up with much of a story aside from possibly making Justin Beiber the villain, since he's also Canadian.

I was thinking about making it a fighting game similar to [Scott Pilgrim vs. the World](https://scottpilgrim.fandom.com/wiki/Scott_Pilgrim_vs._the_World:_The_Game), which supposedly is based on other fighting games I haven't played (Scott is also Canadian, lol). Unfortunately Scott Pilgrim isn't available on PSN anymore (last I checked), which really is a shame because the art, music, and boss fights are pretty awesome.

If you can find Anamanaguchi's soundtrack for Scott Pilgrim somewhere, I highly recommend it. They have a neat rock/chiptune style. If I had to describe it, imagine if you took the soundtracks for Megaman and Megaman X, and threw in some trance. It's very joyful, upbeat, and trippy. I actually found the Scott Pilgrim game because of Anamanaguchi, and not the not the other way around. A long time ago I had downloaded a legal torrent of music samples from South by Southwest, and Anamanaguchi's song "Battle Cat" was in there.
