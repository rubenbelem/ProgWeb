<?php
namespace frontend\models;

use yii\base\Model;
use common\models\User;
use Yii;
/**
 * Signup form
 */
class SignupForm extends Model
{
    public $username;
    public $email;
    public $password;
    public $id_curso;

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            ['username', 'trim'],
            ['username', 'required'],
            ['username', 'unique', 'targetClass' => '\common\models\User', 'message' => 'Esse nome de usuário já existe.'],
            ['username', 'string', 'min' => 2, 'max' => 255],

            ['email', 'trim'],
            ['email', 'required'],
            ['email', 'email'],
            ['email', 'string', 'max' => 255],
            ['email', 'unique', 'targetClass' => '\common\models\User', 'message' => 'Esse email já está em uso.'],

            ['password', 'required'],
            ['password', 'string', 'min' => 6],
            ['id_curso', 'required'],
            ['id_curso', 'integer']
        ];
    }

    /**
     * Signs user up.
     *
     * @return User|null the saved model or null if saving fails
     */
    public function signup()
    {
        if (!$this->validate()) {
            return null;
        }

        $user = new User();
        $user->username = $this->username;
        $user->email = $this->email;
        $user->id_curso = $this->id_curso;
        $user->setPassword($this->password);
        $user->generateAuthKey();
        //$user->created_at =  round(microtime(true) * 1000);
        //$user->updated_at = $user->created_at;
        //Yii::debug($user->save());

        return $user->save() ? $user : null;
    }
}
