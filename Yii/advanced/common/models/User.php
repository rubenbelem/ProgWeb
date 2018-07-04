<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "user".
 *
 * @property int $id
 * @property string $username
 * @property string $auth_key
 * @property string $password_hash
 * @property string $password_reset_token
 * @property string $email
 * @property int $status
 * @property int $created_at
 * @property int $updated_at
 * @property int $id_curso
 *
 * @property Jogada[] $jogadas
 * @property Curso $curso
 */
class User extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'user';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['username', 'auth_key', 'password_hash', 'email', 'created_at', 'updated_at', 'id_curso'], 'required', 'message' => 'Este campo é obrigatório'],
            [['status', 'created_at', 'updated_at', 'id_curso'], 'integer'],
            [['username', 'password_hash', 'password_reset_token', 'email'], 'string', 'max' => 255, 'message' => 'Número máximo de caracteres atingido (255)'],
            [['auth_key'], 'string', 'max' => 32],
            [['username'], 'unique', 'message' => 'O nome de usuário deve ser único'],
            [['email'], 'unique'],
            [['email'], 'email', 'message' => 'Este email não está em um formato válido'],
            [['password_reset_token'], 'unique'],
            [['id_curso'], 'exist', 'skipOnError' => true, 'targetClass' => Curso::className(), 'targetAttribute' => ['id_curso' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'username' => 'Username',
            'auth_key' => 'Auth Key',
            'password_hash' => 'Password Hash',
            'password_reset_token' => 'Password Reset Token',
            'email' => 'Email',
            'status' => 'Status',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
            'id_curso' => 'Id Curso',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getJogadas()
    {
        return $this->hasMany(Jogada::className(), ['id_user' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCurso()
    {
        return $this->hasOne(Curso::className(), ['id' => 'id_curso']);
    }
}
