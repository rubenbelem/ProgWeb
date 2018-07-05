<?php

/* @var $this yii\web\View */
use yii\helpers\Html;
use yii\helpers\Url;
$this->title = 'Jogo Skifree';
$this->registerCssFile('@web/css/style.css');
$this->registerJsFile('@web/js/entities/obstacle.js');
$this->registerJsFile('@web/js/constants.js');
$this->registerJsFile('@web/js/entities/mountain.js');
$this->registerJsFile('@web/js/entities/entity.js');
$this->registerJsFile('@web/js/entities/rectangle.js');
$this->registerJsFile('@web/js/entities/skier.js');
$this->registerJsFile('@web/js/entities/tree.js');
$this->registerJsFile('@web/js/entities/mushroom.js');
$this->registerJsFile('@web/js/entities/dog.js');
$this->registerJsFile('@web/js/entities/monster.js');
$URL_TO_SAVE = Url::to(['jogo/save']);
$this->registerJs("
SAVE_SCORE = (score) => { 
   $.ajax({
        type: 'GET',
        url: '$URL_TO_SAVE',
        data: {
            'pontuacao': Math.round(score)
        },
        error: function() {
            console.log('Deu algum erro!');
        },
        success: function(data) {
            console.log(data);
        }
    })
}
");
$this->registerJsFile('@web/js/skifree.js');

?>
<div class="site-index">
    <div class="body-content">

        <div id="mountain">
            <div id="skier"></div>
            <div id="monster"></div>
            <div id="gameover">
                <div id="gameoverContent">
                    <h1>GAME OVER</h1>
                    <div align="center" id="buttonWrapper">
                        <button id="restartButton" onClick="window.location.reload()">Reiniciar jogo</button>
                    </div>
                </div>
            </div>
        </div>

        <div id="scoreboard">
            <div class="scoreboard-item">
                <p>Distância percorrida: </p>
                <p id="traveledDistance">0</p>
                <p>m</p>
            </div>
            <div class="scoreboard-item">
                <p>Velocidade: </p>
                <p id="speedVisualization">3</p>
                <p> m/s</p>
            </div>
            <div class="scoreboard-item">
                <p>Vidas restantes: </p>
                <p id="lifeRemaining">3</p>
            </div>
        </div>
        <div id="debug"></div>
    </div>
</div>
