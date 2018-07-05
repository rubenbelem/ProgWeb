<?php
/**
 * Created by PhpStorm.
 * User: Ruben
 * Date: 04/07/2018
 * Time: 21:56
 */

namespace frontend\controllers;

use Yii;
use yii\base\InvalidParamException;
use yii\web\BadRequestHttpException;
use yii\web\Controller;

use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use common\models\LoginForm;
use common\models\Jogada;
use frontend\models\PasswordResetRequestForm;
use frontend\models\ResetPasswordForm;
use frontend\models\SignupForm;
use frontend\models\ContactForm;

/**
 * Jogo controller
 */
class JogoController extends Controller
{
    public function actionIndex()
    {
        return $this->render('index', [
        ]);
    }

    public function actionSave($pontuacao)
    {
        if (!Yii::$app->user->isGuest) { // Checando se o usuário está logado
            $jogada = new Jogada();
            $jogada->id_user = Yii::$app->user->id;
            $jogada->pontuacao = $pontuacao;
            $jogada->data_hora = date_create()->format('Y-m-d H:i:s');
            if ($jogada->save()) {
                return 1;
            } else {
                return 0;
            }
        }
    }
}