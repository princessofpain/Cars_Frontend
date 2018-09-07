$(function(){

  const model = {
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

    activeCard: '',

    saveActiveCard: function(target) {
      activeCard = target;
    },

    getActiveCard: function() {
      return activeCard;
    },

    determineTheWinner: function(myCard, opponentsCard) {
      //call API to compare cards
      const winner = myCard;
      controller.showWinner(winner, myCard, opponentsCard);
    }
  };

  const controller = {
    init: function() {
      view.init();
    },

    getCards: function() {
      model.getCards();
    },

    returnCards: function() {
    },

    getActiveCard: function() {
      return model.getActiveCard();
    },

    saveActiveCard: function(target) {
      model.saveActiveCard(target);
    },

    determineTheWinner: function(myCard, opponentsCard) {
      model.determineTheWinner(myCard, opponentsCard);
    },

    showWinner: function(winner, myCard, opponentsCard) {
      view.handleWinner(winner, myCard, opponentsCard);
    }

  };

  const view = {
    init: function() {
      for(let i = 0; i < 6; i++) {
        $('#myStack').append(`<div class="card" id=${i}></div>`);
      }

      $('#play-button').click(view.playCard);
      $('#next-button').click(view.setUpNewRound);
      $('#myStack').children().click(function(e) {
        view.highlightActiveCard(e);
      });
      $('#opponentsCards').click(function() {
        alert("This are not your cards!");
      });

      controller.getCards();
    },

    playCard: function() {
      const roundIsActive = $('#matchfield').children().length;

      if(roundIsActive === 0) {
        const cardId = controller.getActiveCard();
        const activeCardDom = $(`.${cardId}`);
        $('#matchfield').children().remove();

        $('#matchfield').append(`<div class='card' id=${cardId}></div>`);
        $('#matchfield.card').append(activeCardDom);
        $('#matchfield').children().css('justify-self', 'center');
        $(`#myStack>#${cardId}`).remove();
        $("#play-button").css('display', 'none');
        const emptyCard = '';
        controller.saveActiveCard(emptyCard);
      }

        view.opponentPlays();
    },

    setUpNewRound: function() {
      $('#matchfield').children().remove();
      $('#next-button').css('display', 'none');
      $('#play-button').css('display', 'block');
    },

    highlightActiveCard: function(e) {
      if($('.active').length > 0) {
        const oldActiveCard = $('.active');
        oldActiveCard.removeClass('active');
      }

      $(`#${e.target.id}`).addClass('active');
      controller.saveActiveCard(e.target.id);
    },

    opponentPlays: function() {
      setTimeout(function() {
        $('#matchfield').append(`<div class='card'></div>`);
        $('#next-button').css('display', 'block');
        view.setTheWinner();
      }, 1000);
    },

    setTheWinner: function() {
      const myCard = $('#matchfield').first();
      const opponentsCard = $('#matchfield').last();
      controller.determineTheWinner(myCard, opponentsCard);
    },

    handleWinner: function(winner, myCard, opponentsCard) {
      if(winner === myCard) {
        const me = $('#my-points');
        view.addPointsTo(me);
      } else {
        const opponent = $('#opponents-points');
        view.addPointsTo(opponent);
      }
    },

    addPointsTo: function(winner) {
      let points = winner.text();
      points++;
      winner.text(points);

      view.checkRemainingCards();
    },

    checkRemainingCards: function() {
      const remainingCards = $('#myStack').children().length;

      if(remainingCards === 0) {
        console.log("zero cards left");
        $('#next-button').css('display', 'none');
        $('#play-button').css('display', 'none');
        $('#opponentsCards').css('display', 'none');
        $('#game').append(`<div id="finish-game"><button id="finish-button">Finish Game</button></div>`);
      }
    }

   };

  controller.init();
});