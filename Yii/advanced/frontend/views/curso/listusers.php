<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $curso common\models\Curso */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Usuários do Curso ' . $curso->nome;
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="user-index">

    <h1><?= Html::encode($this->title) ?></h1>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'columns' => [
            'username',
            'email:email',
            //'status',
            'created_at',
            //'updated_at',
            //'id_curso',
        ],
    ]); ?>
</div>
