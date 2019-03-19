new Vue({
    el: "#app",
    data:{
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: [],

    },
    methods: {
      startGame: function(){
          this.gameIsRunning = true;
          this.playerHealth = 100;
          this.monsterHealth = 100;
          this.turns = [];
      },
      giveUp: function(){
          this.gameIsRunning = false;
          this.playerHealth = 100;
          this.monsterHealth = 100;
      },
      heal: function(){
          if (this.playerHealth <= 90) {
              this.playerHealth += 10;
          }else {
              this.playerHealth = 100;
          }
          this.turns.unshift({
            isPlayer: true,
            text: 'SUPERMAN heals for 10'
        });
          var max = 5;
          var healer = Math.max(Math.floor(Math.random() * 2));
          this.playerHealth += healer ;

      },
      attack: function(){
          var damage = this.calculateDamage(3, 10);
        this.monsterHealth -= damage;
        this.turns.unshift({
            isPlayer: true,
            text: 'SUPERMAN hits BATMAN for ' + damage
        });
        if (this.checkWin()){
            return;
        }
        this.monsterAttacks();
      },
      specialAttack: function(){
          var damage = this.calculateDamage(10, 20);
        this.monsterHealth -= damage;
        this.turns.unshift({
            isPlayer: true,
            text: 'BATMAN hits hard SUPERMAN for ' + damage
        });
        if (this.checkWin()){
            return;
        }
        this.monsterAttacks();
      },
      calculateDamage: function(min, max){
        return damage = Math.max(Math.floor(Math.random() * 3) + 1, min);
      },
      monsterAttacks: function(){
          var damage = this.calculateDamage(5, 12);
        this.playerHealth -= damage;
        this.turns.unshift({
            isPlayer: true,
            text: 'BATMAN hits SUPERMAN for ' + damage
        });
        this.checkWin();
      },
      checkWin: function(){
          if (this.monsterHealth <= 0){
              if(confirm('SUPERMAN WON!! NEW GAME?')) {
                this.startGame();
              } else {
                  this.gameIsRunning = false;
              }
              return true;
          } else if (this.playerHealth <= 0) {
            if(confirm('BATMAN WON!! NEW GAME?')){
                this.startGame();
            }else {
                this.gameIsRunning = false;
            }
            return true;
          }
          return false;
      }
    },
});