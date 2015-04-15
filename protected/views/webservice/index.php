<?php
header('Content-type: application/json');
echo CJSON::encode($return);
Yii::app()->end();
?>