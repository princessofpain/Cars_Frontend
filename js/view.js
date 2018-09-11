const view = {
    init: function() {
      for(let i = 0; i < 6; i++) {
        $('#myStack').append(`<div class="card" id=${i}></div>`);
      }

      $('#new-button').click(view.startNewGame);
      $('#play-button').click(view.playCard);
      $('#next-button').click(view.setUpNewRound);
      $('#myStack').children().click(function(e) {
        view.highlightActiveCard(e);
      });
      $('#opponentsCards').click(function() {
        alert("This are not your cards!");
      });

      $('#myCards').css('display', 'block');
      $('#matchfield').css('display', 'flex');
      $('#finish-message').remove();

      controller.getCards();
    },

    playCard: function() {
      const roundIsActive = $('#matchfield').children().length;
      const cardId = controller.getActiveCard();

      if(roundIsActive === 0 && cardId !== '') {
        $("#startRound").css('display', 'none');
        $('#matchfield').children().remove();

        $(`#myStack>#${cardId}`).remove();

        $('#matchfield').append(`<div class='card' id=${cardId}></div>`);

        const emptyCard = '';
        controller.saveActiveCard(emptyCard);

        view.opponentPlays();
      }
    },

    setUpNewRound: function() {
      $('#matchfield').children().remove();
      $('#next').css('display', 'none');
      $('#startRound').css('display', 'block');
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
        $('#next').css('display', 'block');
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
        $('#next').css('display', 'none');
        $('#startRound').css('display', 'none');
        $('#opponentsCards').css('display', 'none');
        $('#myPoints').css('display', 'none');
        $('#opponentsPoints').css('display', 'none');

        setTimeout(function() {
          $('#matchfield').children().remove();
          $('#newGame').css('display', 'block');
          view.addWinnerMessage();
        }, 2500);
      }
    },

    addWinnerMessage: function() {
      const myPoints = $('#my-points').text();
      const opponentsPoints = $('#opponents-points').text();
      const result = view.evaluatePoints(myPoints, opponentsPoints);

      $('#game').append(`<div id="finish-message" style={{  background-image: 'img/background_win';}}><p>You have ${myPoints} points and your opponent has ${opponentsPoints} points. ${result}</p></div>`);
    },

    evaluatePoints: function(myPoints, opponentsPoints) {
      let result;

      if(myPoints > opponentsPoints) {
        result = "You win!";
      } else if(myPoints == opponentsPoints) {
        result = "You are equal.";
      } else {
        result = "You lose...";
      }

      return result;
    },

    startNewGame: function() {

      view.removeEventListeners();
      view.init();

      $('#opponentsCards').css('display', 'block');
      $('#startRound').css('display', 'block');
      $('#myPoints').css('display', 'block');
      $('#my-points').html("0");
      $('#opponentsPoints').css('display', 'block');
      $('#opponents-points').html("0");

      $('#newGame').css('display', 'none');
    },

    removeEventListeners: function() {
      $('#new-button').unbind('click');
      $('#play-button').unbind('click');
      $('#next-button').unbind('click');
      $('#myStack').unbind('click');
      $('#opponentsCards').unbind('click');
    }
  };