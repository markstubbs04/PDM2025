# BUG HUNT EXTREME

Bug Hunt EXTREME is the final project in my Programming Digital Media class. It is a spoof on Galaga/Space Invaders gameplay with metroid inspired graphics. The overall gameplay loop is to shoot the spiders before they reach Samus. However, Samus is low on energy, so make your shots count. If you're able to make it to the 8th wave of enemies, you'll be greeted with the horde and one final attempt to kill the bugs and make it off the planet alive.

# Rules:

- You start the game with 10 energy, and receive another 10 energy each round until the last round where you receive 99 to face the horde.
- If the bugs are able to reach Samus' height, then you lose the game.
- If you run out of energy, the spider's will rush you and once they reach Samus you lose the game. If you have only 1 energy left and there is 1 enemy left, firing he last laser will cause the enemy to rush you, but it can still be killed and you can still move on to the next round.

The easiest way to run this game is by downloading what is currently in github and using the Go Live feature in vscode to launch the p5 app. You will additionally need to set up an arduino kit if you want to play the most recent version of the game. To play with just keyboard controls make sure to download the previous version.

The narrative of Bug Hunt EXTREME started out as a helldivers type of spoof, where you are just facing a neverending horde of bugs. You can still see this a bit in the text that appears on screen after each wave. This changed during development when I made the laser projectile and it reminded me of Samus's arm cannon projectile from the Metroid games. At this point I did not have a player sprite so I thought that Samus would be cool to use. The narrative now that the game is mostly complete is kind of just a short metroid game where Samus is being overrun by bugs on an alien planet.

# Future Development/Wishful Additions:

- I wanted to have a more impactful win screen, and had one planned out but I was rushing to get everything done so I would have time to study for my other finals, so the current win screen is just barebones. The planned screen would be Samus in a cool pose shooting one of the spiders.
- More boss type levels would be fun to implement. I had an idea for a Giant spider (with a lot of health)that just slowly walked towards Samus the middle of the screen while other regular spiders are still walking around. I might try to implement this in the future since I think its a cool idea and would definitely give the player a sense of DREAD that the main gameplay loop doesn't really touch much.
- If I spent more time on this game I'd love to make it more level based rather than a single level with waves that get tougher. There's a lot that I could explore with a game like this but having the game reset every time you die makes it hard to continue to add gameplay after the 8th wave since it can already be relatively challenging to get there.

Here is a video of the game running using th arduino: https://youtube.com/shorts/um3FvwZ0UXw

You can check out the sprite sheets and the start screen in the Final folder.
