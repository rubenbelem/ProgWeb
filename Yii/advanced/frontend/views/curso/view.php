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
        <?= Html::a('Atualizar', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Deletar', ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Você tem certeza de que deseja deletar esse item?',
                'method' => 'post',
            ],
        ]) ?>
        <?= Html::a('Ver Usuários do Curso', ['users', 'id' => $model->id], ['class' => 'btn  btn-info']) ?>
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
