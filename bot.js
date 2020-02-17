var Discord = require('discord.js');
var auth = require('./creds.json');
const Math = require("mathjs");

function d(n) { return Math.floor(n * Math.random()) + 1; }

var channels = {}

const client = new Discord.Client();

client.on('ready', () => { console.log(`Logged in as ${client.user.tag}!`); });

client.on('message', msg => {
  var donestuff = false;
  if (msg.author.bot) {
    return;
  }
  if (msg.content === '_begin') {
    donestuff = true;
    channels[msg.channel] = {};
    channels[msg.channel].players = {};
    channels[msg.channel].monsters = 1;
    msg.reply(
        "Game Time Started! https://tenor.com/view/star-wars-anakin-this-is-where-the-fun-begins-gif-13380207");
  }
  if (typeof channels[msg.channel] != "undefined") {
    if (msg.content == "_end") {
      delete channels[msg.channel];
      donestuff = true;
      msg.react("❌");
    }
    if (msg.content.startsWith("_r")) {
      roll = Number(msg.content.substr(2));

      channels[msg.channel].players[msg.author.username] = roll;

      donestuff = true;
      msg.react('🥥');
    }

    if (msg.content == "_play") {
      var msg_string = "";
      var tuples = [];
      for (var key in channels[msg.channel].players) {
        tuples.push([ key, channels[msg.channel].players[key] ])
      }
      u = tuples.sort(function(a, b) { return b[1] - a[1]; });

      console.log(tuples);
      for (var i = 0; i < tuples.length; i++) {
        //        console.log(u[i]);
        msg_string += u[i][0] + ": " + u[i][1] + "\n";
      }
      msg.reply("```" + msg_string + "```")
      donestuff = true;
    }
    if (msg.content.startsWith("_m ")) {
      var arr = msg.content.substr(3).split(" ");
      if (arr.length == 1) {

        arr.unshift(channels[msg.channel].monsters++);
      }
      //    console.log(arr);
      channels[msg.channel].players["Monster " + arr[0]] =
          d(20) + Number(arr[1]);

      donestuff = true;
      msg.react('🥥');
    }
  }
  if (msg.content == "_d20") {
    var roll = d(20);
    if (roll == 20) {
      msg.reply(
          "20! :+1: https://tenor.com/view/unlimited-power-star-wars-gif-10270127");
    } else if (roll == 1) {
      msg.reply("1 :cry:!", {
        files : [
          "https://cdn.discordapp.com/attachments/365600402261016576/678356921224527879/weak.png"
        ]
      });
    } else {

      if (roll <= 5) {

        msg.reply(roll, {
          files : [
            "https://cdn.discordapp.com/attachments/678250451950501888/678263775538839594/visible-sadness-32537681.png"
          ]
        });
      } else if (roll >= 15) {
        msg.reply(roll, {
          files : [
            "https://cdn.discordapp.com/attachments/678250451950501888/678261485838925824/3l23le.png"
          ]
        });
      } else {
        msg.reply(roll);
      }
    }
    donestuff = true;
  }
  if (msg.content == "_d4") {
    msg.reply(d(4));
    donestuff = true;
  }

  if (msg.content == "_d6") {
    msg.reply(d(6));
    donestuff = true;
  }

  if (msg.content == "_d8") {
    msg.reply(d(8));
    donestuff = true;
  }

  if (msg.content == "_d10") {
    msg.reply(d(10));
    donestuff = true;
  }

  if (msg.content == "_d12") {
    msg.reply(d(12));
    donestuff = true;
  }

  if (msg.content == "_d100") {
    msg.reply(d(100));
    donestuff = true;
  }
  if (msg.content == "_stat_roll") {
    var rolls = [];
    for (var i = 0; i < 4; i++) {
      rolls.push(d(6));
    }
    //console.log(rolls);
    var roll = Math.sum(rolls) - Math.min(rolls);
    msg.reply(roll.toString() + " " + JSON.stringify(rolls));
    donestuff=true;
  }

  if (msg.content == "_dbg") {
    msg.reply(JSON.stringify(channels));
  }

  if (!donestuff) {
    //    msg.channel.send(JSON.stringify(channels));
    if (d(100) == 1) {

      msg.reply(" :angry:", {
        files : [
          "https://cdn.discordapp.com/attachments/628651358639226908/678331458871623690/336qw6.png"
        ]
      });
    }
  }
});

client.login(auth.token);
