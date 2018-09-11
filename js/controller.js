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

    showWinner(winner, myCard, opponentsCard) {
      view.handleWinner(winner, myCard, opponentsCard);
    }
  };