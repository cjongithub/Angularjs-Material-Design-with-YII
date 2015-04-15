<?php

class WebserviceController extends Controller {

    protected function beforeAction($action) {
        header('Access-Control-Allow-Origin', '*');
        return parent::beforeAction($action);
    }

    public function actions() {
        return array(
            'page' => array(
                'class' => 'CViewAction',
                'layout' => false
            ),
        );
    }
        
    /**
    * @return array action filters
    */
    public function filters()
    {
        return array(
            'accessControl', // perform access control for CRUD operations
        );
    }
       
    /**
     * Specifies the access control rules.
     * This method is used by the 'accessControl' filter.
     * @return array access control rules
     */
    public function accessRules() {
        return array(
                        
            array('allow', // guest
                'actions'=>array(),
                'users'=>array('?')
            ), 
            array('allow', // any
                'actions'=>array('page', 'common', 'home'),
                'users'=>array('*')
            ), 
            array('allow', // logged in users
                'actions'=>array(),
                'users'=>array('@')
            ),
            array('deny',
                'users'=>array('*'),
            ),
        );
    }

    public function wrapper() {
        $return = array(
            'exception' => false, //status, code, message
            'reload' => false, //reload same page
            'redirectTo' => false, //url,after,text
            'transitionTo' => false, //state, params
            'login' => false, //do login procedure
            'alert' => false, //alert
            'error' => false, //default error message
            'notification' => array(), //gritter notification
            'pageTitle' => false, //title of page
            'description' => false, //description meta of page
            'version' => (float)Yii::app()->params['version'], //version of app
            'data' => false //data used
        );

        return $return;
    }

    //used everywhere
    public function session() {
        return array(
            'guest' => Yii::app()->user->isGuest,
            'user' => Yii::app()->user->isGuest ? false : Yii::app()->user->id,
        );
    }

    public function actionHome() {
        $return = $this->wrapper();
        $this->renderPartial('index', array("return" => $return));
    }

    public function actionCommon() {
        $return = $this->wrapper();
        $return['data'] = array(
            'session' => $this->session(),
        );
        $this->renderPartial('index', array("return" => $return));
    }

    public function actionError() {
        if($error=Yii::app()->errorHandler->error)
        {
            $return['exception'] = array(
                'code' => $error['code'],
                'message' => $error['message']
                );
            $this->renderPartial('index', array("return" => $return));
        }
    }

}

?>