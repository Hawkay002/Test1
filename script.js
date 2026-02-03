document.addEventListener("DOMContentLoaded", function () {
    let resultPage = document.getElementById("result-page");

    function checkAndTriggerGif() {
        if (resultPage.style.display !== "none") { 
            let randomInterval = Math.floor(Math.random() * 70000) + 10000;
            setTimeout(showFloatingGif, randomInterval); 
        }
    }

    function showFloatingGif() {
        if (resultPage.style.display === "none") return;

        let gif = document.createElement("img");
        gif.src = "";  
        gif.style.position = "absolute";
        gif.style.top = Math.random() * (window.innerHeight - 150) + "px"; 
        gif.style.right = "-200px";
        gif.style.width = "150px";
        gif.style.cursor = "none";
        gif.style.display ="none";
        gif.style.animation = "floatUpDown 3s ease-in-out infinite"; 
        
        gif.onclick = function () {
            window.open(""); 
        };
        document.body.appendChild(gif);

        setTimeout(() => {
            gif.style.transition = "right 7s linear";
            gif.style.right = window.innerWidth + "px"; 
        }, 100);

        setTimeout(() => {
            gif.remove();
        }, 6000);
        checkAndTriggerGif();
    }

    let observer = new MutationObserver(checkAndTriggerGif);
    observer.observe(resultPage, { attributes: true, attributeFilter: ["style"] });

    let style = document.createElement("style");
    style.innerHTML = `
        @keyframes floatUpDown {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); } /* Moves up */
            100% { transform: translateY(0px); } /* Moves back down */
        }
    `;
    document.head.appendChild(style);
});





document.getElementById('start1-button').addEventListener('click', function () {
    const popSound = document.getElementById('popSound');
    popSound.play();
    document.getElementById('start-page').style.display = 'none';
    document.getElementById('interm').style.display = 'flex';
});

document.getElementById('start-button').addEventListener('click', function () {
    const notifSound = document.getElementById('notifSound');
    notifSound.play();
    document.getElementById('interm').style.display = 'none';
    document.getElementById('phone-screen').style.display = 'flex';
});

let currentMessageIndex = 0;
const scores = { B: 0, S: 0, W: 0, G: 0, P: 0, D: 0, A: 0, R: 0 };

const dialogue = [
  // 0 (0)
  {
    speaker: 'bot',
    text: ["New post card from some random ass person…"],
    choices: [
      { id: 1, text: '*Open it 😮‍💨*', type: 'A', weight: 2, next: 2, followUpText: [] },
      { id: 2, text: '*Ignore this bitch 😒*', type: 'R', weight: 2, next: 1, followUpText: [] },
    ]
  },
  // 1
  {
    speaker: 'bot',
    text: ["You’re really about to ignore it? Be fucking serious dumbass 😠, it could be important."],
    choices: [
      { id: 1, text: "Ugh, FINE, I'll open it 😩", type: 'O', weight: 1, next: 2, followUpText: [] },
    ]
  },
  // 2 (2)
  {
    speaker: 'bot',
    text: ["Okay first of all HIIII~, Happy Valentine’s Day, my fav hooman 💅"],
    choices: [
      { id: 1, text: 'Wrong number, move along', type: 'B', weight: 2, next: 3, followUpText: [] },
      { id: 2, text: 'Thanks... but who the hell are you? 😀', type: 'S', weight: 2, next: 4, followUpText: [] },
      { id: 3, text: 'Blocked. This is giving scam energy. 🤨', type: 'W', weight: 2, next: 5, followUpText: [] },
    ]
  },

  // 3 (3_1)    
  {
    speaker: 'bot',
    text: ["Wrong number? Bitch, no. That’s literally not possible.", "You summoned me.", "On Valentine’s Day. Don’t play dumb."],
    choices: [
      { id: 1, text: 'Summoned you? Since when?', type: 'G', weight: 1, next: 6, followUpText: [] },
      { id: 2, text: 'Literally no idea what you mean', type: 'P', weight: 1, next: 6, followUpText: [] },
      { id: 3, text: 'Seriously, who are you?!', type: 'D', weight: 1, next: 6, followUpText: [] }
    ]
  },
  // 4 (3_2)    
  {
    speaker: 'bot',
    text: ["Me? You know exactly who I am.", "You called me here, don’t act clueless like this wasn’t your idea."],
    choices: [
      { id: 1, text: 'I summoned a Cupid? Pls.', type: 'G', weight: 1, next: 6, followUpText: [] },
      { id: 2, text: 'I must have been drunk, idk you', type: 'P', weight: 1, next: 6, followUpText: [] },
      { id: 3, text: 'Identify yourself, freak!', type: 'D', weight: 1, next: 6, followUpText: [] }
    ]
  },
  // 5 (3_3)    
  {
    speaker: 'bot',
    text: ["Don’t fucking ignore me.", "You summoned me.", "If you didn’t want this, you shouldn’t have touched the quiz."],
    choices: [
      { id: 1, text: 'Summoned? Is this a ritual?', type: 'G', weight: 1, next: 6, followUpText: [] },
      { id: 2, text: 'I was just bored, chill out', type: 'P', weight: 1, next: 6, followUpText: [] },
      { id: 3, text: 'Tell me who you are right now.', type: 'D', weight: 1, next: 6, followUpText: [] }
    ]
  },

  // 6 (4)    
  {
    speaker: 'bot',
    text: ["Okay, relax. I’ll explain—dramatic ass 🙄.", "I’m your personal Cupid.", "Your love life? Yeah, that’s my job."],
    choices: [
      { id: 1, text: "Clearly you’re failing at your job 🤓☝️", type: 'P', weight: 2, next: 7, followUpText: [] },
      { id: 2, text: "Okay Cupid, what do you want?", type: 'G', weight: 2, next: 8, followUpText: [] },
      { id: 3, text: "I thought this was just a personality test...", type: 'D', weight: 2, next: 8, followUpText: [] },
    ]
  },

  // 7 (5_1)    
  {
    speaker: 'bot',
    text: ["Damn, rude. I’m trying my fucking best.", "Anyway, I gotta ask you 12 questions—Cupid rules.", "Once a year, deal with it."],
    choices: [
      { id: 1, text: "Fine, get it over with", type: 'R', weight: 1, next: 10, followUpText: [] },
      { id: 2, text: "Whatever, I’m down", type: 'A', weight: 1, next: 10, followUpText: ["Maybe this will fix your tragic performance!"] },
    ]
  },
  // 8 (5_2, 5_3)    
  {
    speaker: 'bot',
    text: ["Wow, straight to the point. I respect it.", "Twelve questions. Cupid shit.", "No skipping."],
    choices: [
      { id: 1, text: "K.", type: 'R', weight: 1, next: 10, followUpText: [] },
      { id: 2, text: "Sounds fun, let's do it", type: 'A', weight: 1, next: 10, followUpText: [] },
    ]
  },

  // 9 (6)    
  {
    speaker: 'bot',
    text: ["There are twelve questions.", "No backing out. You ready or are you scared?"],
    choices: [
      { id: 1, text: "Just ask already!", type: 'O', weight: 0, next: 10, followUpText: [] },
      { id: 2, text: "I’m ready for whatever", type: 'O', weight: 0, next: 10, followUpText: [] },
      { id: 3, text: "Let's fucking go", type: 'O', weight: 0, next: 10, followUpText: [] },
    ]
  },

  // 10 (Q1)    
  {
    speaker: 'bot',
    text: ["Let’s start basic.", "1) What the fuck does love even mean to you?"],
    choices: [
      { id: 1, text: "A safe space to just exist together", type: 'G', weight: 2, next: 11, followUpText: [] },
      { id: 2, text: "An absolute adventure with zero boring parts", type: 'P', weight: 2, next: 11, followUpText: [] },
      { id: 3, text: "Ride or die commitment, no matter what", type: 'D', weight: 2, next: 11, followUpText: [] },
      { id: 4, text: "A friendship where we actually trust each other", type: 'G', weight: 2, next: 11, followUpText: [] },
      { id: 5, text: "It means [insert that person's name]", type: 'D', weight: 2, next: 11, followUpText: [] },
      { id: 6, text: "Just hormones and brain activity, honestly", type: 'P', weight: 2, next: 11, followUpText: [] },
    ]
  },

  // 11 (Q2)    
  {
    speaker: 'bot',
    text: ["Okayyy, romantic as hell.", "So, 2) who do you usually fall for? Don’t lie, I’ll know."],
    choices: [
      { id: 1, text: "Coworkers or classmates", type: 'W', weight: 1, next: 12, followUpText: ["I mean, I'm stuck with them everyday!"] },
      { id: 2, text: "I fall fast—usually at first sight", type: 'B', weight: 2, next: 12, followUpText: [] },
      { id: 3, text: "Someone I've known forever, like a best friend", type: 'S', weight: 2, next: 12, followUpText: [] },
      { id: 4, text: "Honestly? No one. I’m over it.", type: 'W', weight: 2, next: 12, followUpText: ["Unless we’re talking about celebrities, obviously."] },
      { id: 5, text: "I don't have a type. When I know, I know.", type: 'B', weight: 1, next: 12, followUpText: [] },
    ]
  },

  // 12 (Q3)    
  {
    speaker: 'bot',
    text: ["3) So if you’re crushing right now, what’s the move? Or are you just gonna sit there and suffer?"],
    choices: [
      { id: 1, text: "I’m telling them immediately", type: 'B', weight: 2, next: 14, followUpText: ["I’ll just call them. If they say no, their loss.", "Like, what's the actual worst that could happen?"] },
      { id: 2, text: "Keep talking and stay on their radar", type: 'S', weight: 2, next: 14, followUpText: ["Consistency is the whole game, babe."] },
      { id: 3, text: "Do absolutely nothing.", type: 'W', weight: 1, next: 13, followUpText: ["They will take that secret to my grave."] },
      { id: 4, text: "Avoid them like the plague", type: 'W', weight: 2, next: 13, followUpText: ["I’ll literally run if I see them coming."] },
      { id: 5, text: "Make subtle moves", type: 'B', weight: 1, next: 14, followUpText: ["Just small hints. I’m not desperate."] },
    ]
  },
  // 13 (Q4_3,4)    
  {
    speaker: 'bot',
    text: ["Ngl gurl, same. While we’re waiting and overthinking—", "4) What kind of dates actually get you excited?"],
    choices: [
      { id: 1, text: "Chill and low-key where we can actually talk", type: 'G', weight: 2, next: 15, followUpText: [] },
      { id: 2, text: "Something spontaneous and fun as hell", type: 'P', weight: 2, next: 16, followUpText: [] },
      { id: 3, text: "Sweet, intimate, and super affectionate", type: 'D', weight: 2, next: 17, followUpText: [] },
    ]
  },
  // 14 (Q4_1,2,5)    
  {
    speaker: 'bot',
    text: ["I love that energy. Confidence like that? Yeah, that gets you attention, babe.", "4) What kind of dates actually get you excited?"],
    choices: [
      { id: 1, text: "Relaxed vibes where we can spend real time", type: 'G', weight: 2, next: 15, followUpText: [] },
      { id: 2, text: "Something fun with lots of cute moments", type: 'P', weight: 2, next: 16, followUpText: [] },
      { id: 3, text: "Something romantic and cherished", type: 'D', weight: 2, next: 17, followUpText: [] },
    ]
  },

  // 15 (Q5_1C)    
  {
    speaker: 'bot',
    text: ["Ohhh, comfy vibes. Cute.", "5) So what does that look like—spell it out."],
    choices: [
      { id: 1, text: "Bookstores - choosing books for each other", type: 'R', weight: 2, next: 18, followUpText: [] },
      { id: 2, text: "Gym - a challenge to see who’s better", type: 'A', weight: 2, next: 18, followUpText: ["Loser owes a hug. I don't make the rules!"] },
      { id: 3, text: "Park - picnic and maybe some boats", type: 'A', weight: 2, next: 18, followUpText: [] },
      { id: 4, text: "Home - cooking our favorite shit together", type: 'R', weight: 2, next: 18, followUpText: ["The way to my heart is through my stomach!"] },
      { id: 5, text: "Planetarium - stars and holding hands", type: 'A', weight: 1, next: 18, followUpText: ["Plus, I get to nerd out about space!"] },
    ]
  },
  // 16 (Q5_2P)    
  {
    speaker: 'bot',
    text: ["Oh, you like surprises? Okay thrill-seeker.", "5) What kind of chaos are we choosing?"],
    choices: [
      { id: 1, text: "Aquarium - holding hands near the fish", type: 'R', weight: 2, next: 18, followUpText: [] },
      { id: 2, text: "Karaoke - screaming our hearts out", type: 'A', weight: 2, next: 18, followUpText: ["My favorite song is the sound of their voice <3"] },
      { id: 3, text: "Art museum - looking at pretty things", type: 'A', weight: 1, next: 18, followUpText: ["Perfect chance to tell them they’re the real art."] },
      { id: 4, text: "Amusement park - roller coasters and screaming", type: 'A', weight: 2, next: 18, followUpText: [] },
      { id: 5, text: "My sofa - movies and lots of cuddling", type: 'R', weight: 2, next: 18, followUpText: [] },
    ]
  },
  // 17 (Q5_2D)    
  {
    speaker: 'bot',
    text: ["Wow. Romantic as fuck.", "5) Where are we going, Notebook energy or what?"],
    choices: [
      { id: 1, text: "Fancy Dinner - candles, wine, the whole bit", type: 'R', weight: 2, next: 18, followUpText: ["Nothing beats expensive food."] },
      { id: 2, text: "Bowling - let the games begin", type: 'A', weight: 2, next: 18, followUpText: ["Loser gets a hug. It's a win-win."] },
      { id: 3, text: "Library - studying and being quiet together", type: 'R', weight: 2, next: 18, followUpText: ["Stolen glances in the stacks are iconic."] },
      { id: 4, text: "Hiking - getting lost in nature together", type: 'A', weight: 2, next: 18, followUpText: ["Love is a trek, after all."] },
      { id: 5, text: "Orchard - picking fruit and holding hands", type: 'A', weight: 1, next: 18, followUpText: [] },
    ]
  },

  // 18 (Q6)    
  {
    speaker: "bot",
    text: ["That’s cute. Like, annoyingly cute.", "6) So what’s your love language, huh?"],
    choices: [
      { id: 1, text: "Quality time", type: 'G', weight: 2, next: 19, followUpText: [] },
      { id: 2, text: "Physical touch", type: 'P', weight: 2, next: 20, followUpText: [] },
      { id: 3, text: "Words of affirmation", type: 'G', weight: 2, next: 21, followUpText: [] },
      { id: 4, text: "Acts of service", type: 'D', weight: 2, next: 22, followUpText: [] },
      { id: 5, text: "Gifts", type: 'D', weight: 2, next: 23, followUpText: [] },
      { id: 6, text: "Teasing and banter", type: 'P', weight: 2, next: 24, followUpText: ["Wait, there’s only 5? Not anymore."] },
    ]
  },
  // 19 (Q7)    
  {
    speaker: "bot",
    text: ["7) Okay but when you say “quality time,” what the hell are you actually doing together?"],
    choices: [
      { id: 1, text: "Taking a trip somewhere far away", type: "B", weight: 2, next: 25, followUpText: [] },
      { id: 2, text: "Just doing the usual shit we both like", type: "S", weight: 2, next: 25, followUpText: [] },
      { id: 3, text: "Cozy nights with deep, real talks", type: "W", weight: 2, next: 25, followUpText: [] },
    ]
  },
  // 20 (Q7)    
  {
    speaker: "bot",
    text: ["7) Don’t be vague—give me an example."],
    choices: [
      { id: 1, text: "Sudden hugs and kisses out of nowhere", type: "B", weight: 2, next: 25, followUpText: [] },
      { id: 2, text: "Cuddling up and holding hands tight", type: "S", weight: 2, next: 25, followUpText: [] },
      { id: 3, text: "Head pats and intense eye contact", type: "W", weight: 2, next: 25, followUpText: [] }
    ]
  },
  // 21 (Q7)    
  {
    speaker: "bot",
    text: ["7) No, seriously. Be specific."],
    choices: [
      { id: 1, text: "Hyping them up until they’re blushing", type: "B", weight: 2, next: 25, followUpText: [] },
      { id: 2, text: "Reminding them I’m always on their side", type: "S", weight: 2, next: 25, followUpText: [] },
      { id: 3, text: "Telling them exactly why they’re appreciated", type: "W", weight: 2, next: 25, followUpText: [] },
    ]
  },
  // 22 (Q7)    
  {
    speaker: "bot",
    text: ["7) Acts of service? Babe, what are you doing - laundry or emotional labor?"],
    choices: [
      { id: 1, text: "Everything—they don't even have to ask", type: "B", weight: 2, next: 25, followUpText: [] },
      { id: 2, text: "Handling the small daily chores", type: "S", weight: 2, next: 25, followUpText: [] },
      { id: 3, text: "Whatever they need, I've got it covered", type: "W", weight: 2, next: 25, followUpText: [] },
    ]
  },
  // 23 (Q7)    
  {
    speaker: "bot",
    text: ["7) Alright gift-giver, what kinda gifts we talking—cheap or thoughtful?"],
    choices: [
      { id: 1, text: "Extravagant and one-of-a-kind", type: "B", weight: 2, next: 25, followUpText: ["If they want it, I’m getting it for them. Period."] },
      { id: 2, text: "Practical things they actually need", type: "S", weight: 2, next: 25, followUpText: ["I pay attention to the details, unlike some people."] },
      { id: 3, text: "Something personal and super thoughtful", type: "W", weight: 2, next: 25, followUpText: ["Something custom made, just for them."] },
    ]
  },
  // 24 (Q7)    
  {
    speaker: "bot",
    text: ["Congratulations, you just made up a whole new love language.", "7) Wanna explain yourself or nah?"],
    choices: [
      { id: 1, text: "They’re just too cute when I make them pout!", type: "B", weight: 2, next: 25, followUpText: [] },
      { id: 2, text: "I love a little sass if it’s fun", type: "S", weight: 2, next: 25, followUpText: [] },
      { id: 3, text: "Pranks are life, as long as they’re cool with it", type: "W", weight: 2, next: 25, followUpText: [] },
    ]
  },

  // 25 (Q8)    
  {
    speaker: "bot",
    text: ["Oh? Interesting. I’m learning shit about you already.", "8) So what’s your date outfit vibe—hot or comfy?"],
    choices: [
      { id: 1, text: "Classy and timeless vibes", type: "D", weight: 2, next: 26, followUpText: [] },
      { id: 2, text: "Stylish and cool as fuck", type: "P", weight: 1, next: 26, followUpText: [] },
      { id: 3, text: "Simple and comfortable", type: "G", weight: 2, next: 26, followUpText: [] },
      { id: 4, text: "Literally anything and my Crocs", type: "P", weight: 2, next: 26, followUpText: [] },
      { id: 5, text: "Whatever makes me feel confident", type: "G", weight: 1, next: 26, followUpText: [] },
    ]
  },

  // 26 (Q9)    
  {
    speaker: "bot",
    text: ["9) What’s the one thing you always bring on a date? And don’t say “trauma.”"],
    choices: [
      { id: 1, text: "A fresh bouquet of flowers", type: "B", weight: 2, next: 27, followUpText: [] },
      { id: 2, text: "My wallet, obviously", type: "S", weight: 2, next: 27, followUpText: [] },
      { id: 3, text: "My entire backpack", type: "W", weight: 2, next: 27, followUpText: ["I’ve got wipes, gum, band-aids... I'm prepared!"] },
      { id: 4, text: "A big umbrella", type: "W", weight: 2, next: 27, followUpText: ["Big enough for both of us if it rains."] },
      { id: 5, text: "A camera", type: "B", weight: 2, next: 27, followUpText: ["Gotta capture the memories, babe."] },
      { id: 6, text: "A small, cute gift", type: "S", weight: 2, next: 27, followUpText: ["Like matching keychains or a plushie."] },
    ]
  },

  // 27 (Q10)    
  {
    speaker: "bot",
    text: ["Okay, smart ass choice. Enough fake romance—", "10) Who are you in your friend group?"],
    choices: [
      { id: 1, text: "The one who’s actually taken", type: "D", weight: 2, next: 28, followUpText: [] },
      { id: 2, text: "The quiet, mysterious one", type: "G", weight: 2, next: 31, followUpText: [] },
      { id: 3, text: "The one who plans every single thing", type: "P", weight: 2, next: 30, followUpText: [] },
      { id: 4, text: "The shipper and matchmaker", type: "P", weight: 2, next: 29, followUpText: [] },
      { id: 5, text: "Single, but I’m the love guru", type: "G", weight: 2, next: 29, followUpText: ["Coaches don’t play the game, honey!"] },
      { id: 6, text: "Friends? Who said I have friends?", type: "D", weight: 2, next: 32, followUpText: [] },
    ]
  },

  // 28 (Q11_)    
  {
    speaker: 'bot',
    text: ["Ohhh, taken? I see you.", "11) So what relationship advice you got, expert?"],
    choices: [
      { id: 1, text: "Never settle for less. Know your worth.", type: 'B', weight: 2, next: 33, followUpText: [] },
      { id: 2, text: "Put in the effort to make them happy", type: 'W', weight: 2, next: 33, followUpText: [] },
      { id: 3, text: "Make every day feel special", type: 'S', weight: 2, next: 33, followUpText: [] },
    ]
  },

  // 29 (Q11_2,3)    
  {
    speaker: 'bot',
    text: ["Damn, playing Cupid now?", "11) Alright bitch, drop the wisdom."],
    choices: [
      { id: 1, text: "Don't settle. You know what's best for you.", type: 'B', weight: 2, next: 33, followUpText: [] },
      { id: 2, text: "Effort is everything. Work for it.", type: 'W', weight: 2, next: 33, followUpText: [] },
      { id: 3, text: "Cherish every single moment you have.", type: 'S', weight: 2, next: 33, followUpText: [] },
    ]
  },

  // 30 (Q11_3,4)    
  {
    speaker: 'bot',
    text: ["Yeah, I can tell—you’re cool.", "11) So if you met your past self, what love advice are you giving?"],
    choices: [
      { id: 1, text: "Tell them to never settle for less", type: 'B', weight: 2, next: 33, followUpText: [] },
      { id: 2, text: "Tell them to actually put in some effort", type: 'W', weight: 2, next: 33, followUpText: [] },
      { id: 3, text: "Tell them to make every day feel special", type: 'S', weight: 2, next: 33, followUpText: [] },
    ]
  },

  // 31 (Q11...)    
  {
    speaker: 'bot',
    text: ["Definitely the cool one.", "11) So—past you. What’s the lesson?"],
    choices: [
      { id: 1, text: "Know your worth and don't settle", type: 'B', weight: 2, next: 33, followUpText: [] },
      { id: 2, text: "Happy partners need happy effort", type: 'W', weight: 2, next: 33, followUpText: [] },
      { id: 3, text: "Live in the moment and cherish it", type: 'S', weight: 2, next: 33, followUpText: [] },
    ]
  },

  // 32 (Q11...)    
  {
    speaker: 'bot',
    text: ["Bitch you better be joking, of course you have friends. I’m one now.", "And yeah—you are your own best friend. Don’t forget that shit.", "11) So—past you. What’s the love advice?"],
    choices: [
      { id: 1, text: "Never ever settle for a basic bitch", type: 'B', weight: 2, next: 33, followUpText: [] },
      { id: 2, text: "Try harder to make things work", type: 'W', weight: 2, next: 33, followUpText: [] },
      { id: 3, text: "Make every single moment count", type: 'S', weight: 2, next: 33, followUpText: [] },
    ]
  },

  // 33 (Q12)    
  {
    speaker: 'bot',
    text: ["Last question. Make it count.", "12) What are you wishing for?"],
    choices: [
      { id: 1, text: "Literal tons of chocolate", type: 'P', weight: 2, next: 34, followUpText: [] },
      { id: 2, text: "Send me some actual love for once", type: 'G', weight: 2, next: 34, followUpText: [] },
      { id: 3, text: "For my crush to finally like me back 😭😭", type: 'D', weight: 2, next: 34, followUpText: [] },
      { id: 4, text: "Just a happy Valentine’s Day", type: 'P', weight: 2, next: 34, followUpText: [] },
      { id: 5, text: "A weekend where I can actually sleep", type: 'D', weight: 2, next: 34, followUpText: [] },
    ]
  },

  // 34    
  {
    speaker: 'bot',
    text: ["Noted. Manifesting that for you.", "So what are you actually doing today—", "besides this dumb little quiz?"],
    choices: [
      { id: 1, text: "Eating way too much chocolate", type: 'R', weight: 2, next: 35, followUpText: [] },
      { id: 2, text: "Going out to have some real fun", type: 'A', weight: 1, next: 35, followUpText: [] },
      { id: 3, text: "Working or studying like a loser T^T", type: 'R', weight: 1, next: 35, followUpText: [] },
      { id: 4, text: "Duh, I actually have a date", type: 'A', weight: 1, next: 35, followUpText: [] },
      { id: 5, text: "Zero plans, just rotting at home", type: 'R', weight: 1, next: 35, followUpText: [] },
    ]
  },


  // 35 last    
  {
    speaker: 'bot',
    text: ["lol... have fun!", "Ready to see your result?"],
    choices: [
      { id: 1, text: 'YES, GIVE IT TO ME!', type: 'O', weight: 0, next: 100, followUpText: [] },
    ]
  },
];



function addMessage(speaker, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', speaker);
    messageElement.textContent = text;
    document.getElementById('chatbox').appendChild(messageElement);
    document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;


    /*if (isLink) {
        const link = document.createElement('a');
        link.innerText = text;
        link.onclick = displayResult;
        messageElement.appendChild(link);
    }
    else if (opt) {
        const link = document.createElement('a');
        link.innerText = text;
        link.href = "https://www.instagram.com/izonfalzo/?hl=en";
        link.target = "_blank";
        messageElement.appendChild(link);
    }else {
        messageElement.textContent = text;
    }*/
}

function showChoices(choices) {
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';

    choices.forEach(choice => {
        const choiceButton = document.createElement('button');
        choiceButton.classList.add('choice-button');
        choiceButton.textContent = choice.text;
        choiceButton.onclick = () => handleChoice(choice.type, choice.type2, choice.type3, choice.weight, choice.id, choice.next);
        choicesContainer.appendChild(choiceButton);
    });
}

let typingInterval;
let typingDots = 0;

function showTypingDots() {
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.textContent = 'typing...';
    document.getElementById('chatbox').appendChild(typingIndicator);
    typingIndicator.style.display = 'inline';

    typingDots = 0;

    typingInterval = setInterval(() => {
        typingIndicator.textContent = '.'.repeat(typingDots % 5);
        typingDots++;
    }, 250);
}

function stopTypingDots() {
    clearInterval(typingInterval);
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function displayResult() {
    let resultType = '';
    // B, S, or W
    let topBSW = [];
    if (scores.B >= scores.S && scores.B >= scores.W) topBSW.push('B');
    if (scores.S >= scores.B && scores.S >= scores.W) topBSW.push('S');
    if (scores.W >= scores.B && scores.W >= scores.S) topBSW.push('W');
    resultType += topBSW[Math.floor(Math.random() * topBSW.length)];

    // C, P, or D
    let topGPD = [];
    if (scores.G >= scores.P && scores.G >= scores.D) topGPD.push('G');
    if (scores.P >= scores.G && scores.P >= scores.D) topGPD.push('P');
    if (scores.D >= scores.G && scores.D >= scores.P) topGPD.push('D');
    resultType += topGPD[Math.floor(Math.random() * topGPD.length)];

    // A or R
    let topAR = [];
    if (scores.A >= scores.R) topAR.push('A');
    if (scores.R >= scores.A) topAR.push('R');
    resultType += topAR[Math.floor(Math.random() * topAR.length)];


    const resultsText = {
        'BGA': 'Raccoon',
        'BGR': 'Black Cat',
        'BDA': 'Doberman',
        'BDR': 'Lion',
        'BPA': 'Golden Retriever',
        'BPR': 'Fox',
        'SGA': 'Hamster',
        'SGR': 'Capybara',
        'SDA': 'Duck',
        'SDR': 'Sheep',
        'SPA': 'Orange Cat',
        'SPR': 'Chihuahua',
        'WGA': 'Pigeon',
        'WGR': 'Deer',
        'WDA': 'Snow Leopard',
        'WDR': 'Hedgehog',
        'WPA': 'Bunny',
        'WPR': 'Red Panda'
    }
const resultImages = {
    'BGA': '1.png',
    'BGR': '2.png',
    'BDA': '3.png',
    'BDR': '4.png',
    'BPA': '5.png',
    'BPR': '6.png',
    'SGA': '7.png',
    'SGR': '8.png',
    'SDA': '9.png',
    'SDR': '10.png',
    'SPA': '11.png',
    'SPR': '12.png',
    'WGA': '13.png',
    'WGR': '14.png',
    'WDA': '15.png',
    'WDR': '16.png',
    'WPA': '17.png',
    'WPR': '18.png',
};

    //document.getElementById('result-text').textContent = resultType + ' ' + resultsText[resultType];
    /*document.getElementById('result-image').src = resultImages[resultType];
    document.getElementById('result-overlay').style.display = 'flex';*/
    document.getElementById("phone-screen").style.display = "none";
    document.getElementById("result-page").style.display = "flex";
    document.getElementById("result-image").src = "IMG/" + resultImages[resultType];
    document.getElementById("result-image").alt = resultType + resultsText[resultType];
}

/*function closeResult() {
    document.getElementById('result-overlay').style.display = 'none';
    setTimeout(() => {
        addMessage('bot', 'Would you like to play again?');
        showChoices([
            { text: 'Yes, let’s go!', type: 'restart' },
            { text: 'No, thanks.', type: 'exit' }
        ]);
    }, 500);
}*/

function handleChoice(type, type2, type3, weight, id, nextIndex) {
    const dingSound = document.getElementById('dingSound');
    dingSound.play();
    const chosenOption = dialogue[currentMessageIndex].choices.find(choice => choice.type === type && choice.id === id);
    scores[type] += weight;
    scores[type2] += weight;
    scores[type3] += weight;



    updateDebugScores();
    currentMessageIndex = nextIndex;
    document.getElementById('choices').innerHTML = '';
    addMessage('user', chosenOption.text, false);

    if (chosenOption.followUpText && chosenOption.followUpText.length > 0) {
        chosenOption.followUpText.forEach((followUp, index) => {
            setTimeout(() => {
                addMessage('user', followUp);
            }, (index + 1) * 1000);
        });
    }

    setTimeout(() => {
        showTypingDots();

        setTimeout(() => {
            stopTypingDots();
            const popSound = document.getElementById('popSound');
            popSound.play();
            if (currentMessageIndex == 0 || currentMessageIndex == 2 || currentMessageIndex >=3 ) {
                const header = document.getElementById("header");
                header.textContent = 'Unknown';
                header.style.color = '#f4f1e8';
                header.style.backgroundColor = 'var(--2-color)';
                const phoneScreen = document.getElementById("phone-screen");
                phoneScreen.style.backgroundColor = '#fff';
            }

            if (currentMessageIndex >= 6) {
                const header = document.getElementById("header");
                header.textContent = 'Cupid';
                header.style.color = '#f4f1e8';
            }

            if (currentMessageIndex < dialogue.length) {
                const currentDialogue = dialogue[currentMessageIndex];
                currentDialogue.text.forEach((text, index) => {
                    setTimeout(() => {
                        addMessage(currentDialogue.speaker, text);
                    }, index * 1000);
                });
                setTimeout(() => {
                    showChoices(currentDialogue.choices);
                }, currentDialogue.text.length * 1000);

            }
            else {
                triggerIconShower();
                displayResult();
            }

        }, 1500);
    }, (chosenOption.followUpText.length * 1000) + 500);
}
//}


function restartQuiz() {
    document.getElementById("result-page").style.display = "none";
    document.getElementById("start-page").style.display = "flex";
    currentMessageIndex = 0;
    scores.B = scores.S = scores.W = scores.G = scores.P = scores.D = scores.A = scores.R = 0;
    document.getElementById('chatbox').innerHTML = '';
    document.getElementById('choices').innerHTML = '';
    const header = document.getElementById("header");
    header.textContent = '02/14';
    header.style.color = '#fff';
    header.style.backgroundColor = 'rgb(22, 22, 22)';
    const phoneScreen = document.getElementById("phone-screen");
    phoneScreen.style.backgroundColor = 'rgb(22, 22, 22)';
    startConversation();
}

function startConversation() {

    addMessage('bot', dialogue[0].text);
    showChoices(dialogue[0].choices);

}

function updateDebugScores() {
    const debugScoresElement = document.getElementById('debug-scores');
    const formattedScores = `
    ${currentMessageIndex+1}
B: ${scores.B}, S: ${scores.S}, W: ${scores.W},
G: ${scores.G}, P: ${scores.P}, D: ${scores.D}, 
A: ${scores.A}, R: ${scores.R}`;
    debugScoresElement.textContent = formattedScores.trim();
}




/*function share() {
    const link = window.location.href;
    
    navigator.clipboard.writeText(link)
        .then(() => {
            alert('Link copied to clipboard!');
        })
        .catch(err => {
            alert('Failed to copy the link: ' + err);
        });

    html2canvas(document.body).then(canvas => {
        const screenshot = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = screenshot;
        downloadLink.download = 'myresult.png';
        downloadLink.click();
    });
}*/


function share() {
    const resultImg = document.getElementById("result-image");
    const imgSrc = resultImg.src;

    const link = document.createElement("a");
    link.href = imgSrc;
    link.download = imgSrc.split("/").pop(); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}




function triggerIconShower(event) {
    for (let i = 0; i < 15; i++) {
        const icon = document.createElement('div');
        icon.classList.add('icon');

        const iconContent = Math.random() > 0.5 ? '♥' : '★';
        icon.textContent = iconContent;


        if (iconContent === '♥') {
            icon.classList.add('heart');
        }
        else {
            icon.classList.add('star');
        }


        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        icon.style.left = `${x}px`;
        icon.style.top = `${y}px`;


        document.body.appendChild(icon);


        setTimeout(() => {
            icon.remove();
        }, 3000);
    }
}

startConversation();
