---
title: "C64 Ramblings"
date: 2019-09-21T23:27:52-07:00
draft: false
categories:
    - commodore
---

I tried to get a Commodore 64 from eBay, but I got outbid many times and got frustrated. I mentioned to my family back in May about my ideas of getting a machine and my stepdad told me he had one! He mailed it to me a month or two ago. These are my general experiences with it so far. I'll try to keep my programming experiences with it in a future post, because there's just too much to cover here.

<!--more-->

The system itself is pretty quirky. It's weird having to shut off the entire computer to quit most programs. It's also strange to have run and load as separate actions, but it makes sense since the computer is oriented towards BASIC programs, of which I've written zero so far. Only C for me. I don't understand why they decided to allow you to backspace past the beginning of the line, but then it doesn't interpret correctly if you type on part of the previous one. The keyboard layout can be confusing sometimes, and I've lost count of how many times I've accidentally pressed shift at the wrong time when typing the `LOAD "*",8,1` command and accidentally put the system into tape read mode.

The Fastload Reloaded cart that I got is pretty useful; it speeds up reads from the disk, and the system is unbearably slow to load without it. It also has a handy keyboard shortcut to run the first program on the disk, {{<cbm>}} + RUN/STOP, which is similar to Epyx's original Fastload. I've never had any compatibility problems with the cartridge, all of the issues have been with using an SD2IEC to load programs from an SD card. The drive emulation sometimes doesn't work with old games with special loading code, and multiple disk games can be frustrating. In that case you are at the mercy of any mods you can find, if you're lucky. 

I tried to play the [Bard's Tale](https://www.c64-wiki.com/wiki/The_Bard%27s_Tale), a role playing game similar to Dungeons and Dragons, but wasn't sure how at first because it requires a blank disc to save characters. There is a disk swap mechanism, but since you are selecting it blindly using the buttons on the top of the drive, there is a pretty good chance you'll choose the wrong one and overwrite your game disk. I eventually found a modified image that had the character data initialized on the same disk. I've thought about getting an actual floppy drive instead, but I didn't want to deal with the poor performance and the inevitable breaking from having too many moving parts.

I've also discovered a game similar to VVVVVV in some ways, called [Monty on the Run](https://www.c64-wiki.com/wiki/Monty_on_the_Run). It is a game where you play as a mole escaping through a house, and all the things in the house are trying to kill him. Some are inanimate objects such as vacuums and clocks, and others are odd abstract creatures with spinning heads and big noses. The game is pretty fun, but it's a little frustrating because it runs too fast on my system which is a US (NTSC) system, but the game is designed for UK (PAL) systems which run at a slower frame rate.

While playing Monty on the Run I accidentally broke my joystick, and when I opened it up I discovered that somebody had already glued it back together once. I briefly braced for the wave of regret over spending money on a used controller, and bought a new Atari 2600 lookalike controller. The feel of the switches is a lot better and the joystick is nice and loose.

Some other games I've also played:

- **Neverending Story**: The beginning had a pretty cool intro theme, but I think it was part of the opening screen made by the people who hacked it. The game itself seemed kind of boring, which I guess I should expect for a game based on a movie/book. It was a text adventure supplemented with pictures. I didn't get far but it seemed like the game was going to be too restricted by sticking to the source material too closely.

- **Giana Sisters**: One of the first Mario clones. It's basically Mario. Not really a whole lot more to say there. The scrolling performance of the game is fairly impressive considering how underpowered the system is.

- **Arkanoid**: A breakout type game. Pretty similar to the arcade version, but the digital joystick takes away that excellent precision you get with the original dial controller. I think there's a way to play with a mouse.

So that's been my experience. Pretty nice, just discovering some of the quirks of the C64 as well as the quirks introduced by my emulated peripherals. In future posts I'll describe what my programming experience has been like writing a C game for the cc65 compiler.
