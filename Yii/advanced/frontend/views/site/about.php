<?php

/* @var $this yii\web\View */

use yii\helpers\Html;

$this->title = 'About';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-about">
    <h1><?= Html::encode($this->title) ?></h1>
    <p>Esse é um site feito para o trabalho final da disciplina de Programação Web 2018/1</p>
    <p>A data e a hora é: <?= $date ?> </p>
    <code><?= __FILE__ ?></code>
</div>
