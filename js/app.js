$(function(){

  var model = {
    // fetch data from API
    getCards: function() {
      const cards = [
        ["Ford", "Mustang Shelby GT 640 Golden Snake", "5.5", "4.5", "250", "548"],
        ["Dodge", "Challenger SRT8", "6.1", "4.7", "278", "431"],
        ["Chevrolet", "Camaro 2SS Geiger Compressor", "6.2", "4.8", "250", "568"],
        ["Corvette", "C7 Stingray", "6.2", "4.2", "290", "466"],
        ["Dodge", "Charger SRT Helicat", "6.2", "3.7", "320", "717"],
        ["Ford", "Mustang Bullitt", "5.0", "3.9", "262", "464"]
      ]
      controller.returnCards(cards)
    },
  };

  var controller = {
    init: function() {
      view.init();
    },

    getCards: function() {
      model.getCards();
    },

    returnCards: function() {
    }
  };

  var view = {
    init: function() {
      for(let i = 0; i < 6; i++) {
        $('#myStack').append(`<div class="card" id=${i}></div>`);
      }

      $('#play-button').click(view.playCard);
      $('#next-button').click(view.removeCards);
      $('#myStack').children().click(function(e) {
        view.highlightActiveCard(e);
      });
      $('#opponentsCards').click(function() {
        alert("This are not your cards!");
      });

      controller.getCards();
    },

    playCard: function() {
    },

    removeCards: function() {
    },

    highlightActiveCard: function(e) {
    },

   };

  controller.init();
});