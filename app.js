function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      roundCounter: 1,
      maxPlayerHealth: 100,
      result: '',
      attackValuePlayer: 0,
      attackValueMonster: 0,
      healValue: 0,
      logs: [],
    };
  },

  computed: {
    monsterBarStyles() {
      if (this.monsterHealth <= 0) {
        return { width: '0%' };
      }
      return { width: this.monsterHealth + '%' };
    },
    playerBarStyles() {
      if (this.playerHealth <= 0) {
        return { width: '0%' };
      }
      return { width: this.playerHealth + '%' };
    },
    specialAttackIsDisable() {
      if (this.roundCounter === 1) {
        return true;
      }
      return this.roundCounter % 3 === 0 ? false : true;
    },
    healIsDisable() {
      return this.roundCounter === 1 ? true : false;
    },
    isGameOver() {
      return this.playerHealth <= 0 || this.monsterHealth <= 0;
    },
  },

  methods: {
    displayLog(text, playerValue) {
      this.logs.unshift(
        `Player ${text} ${playerValue} and Monster damage ${this.attackValueMonster}`
      );
    },

    restartGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.roundCounter = 1;
      this.logs = [];
      this.attackValuePlayer = 0;
      this.attackValueMonster = 0;
      this.healValue = 0;
    },

    surrender() {
      this.playerHealth = 0;
      this.result = `Player has surrendered Player HP: ${this.playerHealth} Monster HP: ${this.monsterHealth}`;
    },

    displayGameResult(playerHealth, monsterHealth) {
      if (playerHealth <= 0 && playerHealth < monsterHealth) {
        return (this.result = `Monster beats Player!\n Monster HP: ${this.monsterHealth} Player HP: ${playerHealth}`);
      } else if (monsterHealth <= 0 && monsterHealth < playerHealth) {
        return (this.result = `Player beats Monster!\n Player HP: ${this.playerHealth} Monster HP: ${this.monsterHealth}`);
      } else if (
        playerHealth === monsterHealth &&
        playerHealth !== this.maxPlayerHealth
      ) {
        return (this.result = `Draw! Player HP: ${this.playerHealth} Monster HP: ${this.monsterHealth}`);
      }
    },
    healPlayer() {
      this.roundCounter++;
      this.healValue = getRandomValue(8, 18);
      this.playerHealth += this.healValue;
      if (this.playerHealth > this.maxPlayerHealth) {
        this.playerHealth = this.maxPlayerHealth;
      }
      this.attackPlayer();
      this.displayLog('heal', this.healValue);
    },
    attackMonster() {
      this.roundCounter++;
      this.attackValuePlayer = getRandomValue(5, 12);
      this.monsterHealth -= this.attackValuePlayer;
      this.attackPlayer();
      this.displayLog('damage', this.attackValuePlayer);
    },
    attackPlayer() {
      this.attackValueMonster = getRandomValue(8, 15);
      this.playerHealth -= this.attackValueMonster;
      this.displayGameResult(this.playerHealth, this.monsterHealth);
    },
    specialAttackMonster() {
      this.roundCounter++;
      this.attackValuePlayer = getRandomValue(10, 25);
      this.monsterHealth -= this.attackValuePlayer;
      this.attackPlayer();
      this.displayLog('special damage', this.attackValuePlayer);
    },
  },
});

app.mount('#game');
