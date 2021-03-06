'use strict';

const combinationBySevenCards = require(__dirname + '/seven-grade.js');

function flop(cardsOnTheTable) {

  const cards = [];
  for (let suit = 1; suit < 5; suit++) {
    for (let card = 0; card < 13; card++) {
      cards.push([card, suit]);
    }
  }

  const userFirstCard = [
    cardsOnTheTable[0] % 13,
    Math.floor(cardsOnTheTable[0] / 13) + 1
  ];
  const userSecondCard = [
    cardsOnTheTable[1] % 13,
    Math.floor(cardsOnTheTable[1] / 13) + 1
  ];
  const commonFirstCard = [
    cardsOnTheTable[2] % 13,
    Math.floor(cardsOnTheTable[2] / 13) + 1
  ];
  const commonSecondCard = [
    cardsOnTheTable[3] % 13,
    Math.floor(cardsOnTheTable[3] / 13) + 1
  ];
  const commonThirdCard = [
    cardsOnTheTable[4] % 13,
    Math.floor(cardsOnTheTable[4] / 13) + 1
  ];

  cardsOnTheTable.sort((first, second) => second - first);
  for (const curCard of cardsOnTheTable) {
    cards.splice(curCard, 1);
  }

  let winCount = 0;
  let gameCount = 0;
  for (let i1 = 0; i1 < 46; i1++) {
    for (let i2 = i1 + 1; i2 < 47; i2++) {
      const userAndCommonCard = [
        [cards[i1][0], cards[i1][1]],
        [cards[i2][0], cards[i2][1]],
        commonFirstCard,
        commonSecondCard,
        commonThirdCard,
        userFirstCard,
        userSecondCard,
      ];
      const [
        userGrade,
        userFirstKiker = 0,
        userSecondKiker = 0,
        userThirdKiker = 0,
        userFouthKiker = 0
      ] = combinationBySevenCards(userAndCommonCard);
      const remainingCards = cards.slice();
      remainingCards.splice(i2, 1);
      remainingCards.splice(i1, 1);
      for (let enemyFirstCard = 0; enemyFirstCard < 44; enemyFirstCard++) {
        for (
          let enemySecondCard = enemyFirstCard + 1;
          enemySecondCard < 45;
          enemySecondCard++
        ) {
          const enemyAndCommonCard = [
            [cards[i1][0], cards[i1][1]],
            [cards[i2][0], cards[i2][1]],
            commonFirstCard,
            commonSecondCard,
            commonThirdCard,
            [
              remainingCards[enemySecondCard][0],
              remainingCards[enemySecondCard][1]
            ],
            [
              remainingCards[enemyFirstCard][0],
              remainingCards[enemyFirstCard][1]
            ]
          ];
          const [
            enemyGrade,
            enemyFirstKiker = 0,
            enemySecondKiker = 0,
            enemyThirdKiker = 0,
            enemyFouthKiker = 0
          ] = combinationBySevenCards(enemyAndCommonCard);

          if (userGrade > enemyGrade) {
            winCount++;
            gameCount++;
          } else if (userGrade < enemyGrade) {
            gameCount++;
          } else if (userFirstKiker > enemyFirstKiker) {
            winCount++;
            gameCount++;
          } else if (userFirstKiker < enemyFirstKiker) {
            gameCount++;
          } else if (userSecondKiker > enemySecondKiker) {
            winCount++;
            gameCount++;
          } else if (userSecondKiker < enemySecondKiker) {
            gameCount++;
          } else if (userThirdKiker > enemyThirdKiker) {
            winCount++;
            gameCount++;
          } else if (userThirdKiker < enemyThirdKiker) {
            gameCount++;
          } else if (userFouthKiker > enemyFouthKiker) {
            winCount++;
            gameCount++;
          } else if (userFouthKiker < enemyFouthKiker) {
            gameCount++;
          } else {
            winCount += 0.5;
            gameCount++; // TODO: !!! how much is correctly considered a draw?
          }
        }
      }
    }
  }
  return winCount / gameCount;
}

module.exports = flop;
