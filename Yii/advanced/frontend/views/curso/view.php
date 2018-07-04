<?php

use yii\helpers\Html;
use yii\widgets\DetailView;
use common\models\User;
/* @var $this yii\web\View */
/* @var $model common\models\Curso */


$this->registerCssFile('@web/css/curso-view.css');
$this->title = $model->nome;
$this->params['breadcrumbs'][] = ['label' => 'Cursos', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="curso-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Update', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Delete', ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Are you sure you want to delete this item?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'nome',
            'sigla',
            'descricao:ntext',
            [
                'label' => 'Número de Alunos',
                'value' => User::find()->where('id_curso=' . strval($model->id))->count()
            ],
        ],
    ]) ?>

</div>
