// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css";

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html";
import $ from "jquery";

// Import local files
//
// Local files can be imported directly using relative paths, for example:
import socket from "./socket"

import game_init from "./starter-game";
import init_index from './index'

$(() => {
  let game = $('#game-root')[0];
  let index = $("#index-page")[0]

  if (game) {
    let channel = socket.channel("game:" + window.gameName)
    game_init(game, channel, window.gameName);
  }
    
  
  if (index)
    init_index(index)
  
});

