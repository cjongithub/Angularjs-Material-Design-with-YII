<!DOCTYPE html>
<html lang="en" ng-app="ngXtendify" ng-controller="CommonController">
    <head>
        <title>{{ Page.title()}}</title>
        <meta name="description" value="{{ Page.description() }}" ng-if="Page.description()"/>
    </head>
    <body>
        <base href="<?php echo Yii::app()->request->baseUrl . "/"; ?>"/>
        <div ui-view="header"></div>
        <div ui-view="content"></div>
        <div ui-view="footer"></div>
    </body>
</html>

<?php

$clientScript = Yii::app()->clientScript;
$components = Yii::app()->request->baseUrl . "/components/";
$css_base_path = Yii::app()->request->baseUrl . "/includes/css/";
$js_base_path = Yii::app()->request->baseUrl . "/includes/js/";
$min = ''; //'.min';

$css_paths = array(
    $components . "angular-material/angular-material{$min}.css",
    $css_base_path . "custom.css",
);
foreach ($css_paths as $css_path) {
    $clientScript->registerCssFile($css_path.'?v='.Yii::app()->params['version']);
}

$js_paths = array(
    //angularjs
    $components . "angular/angular{$min}.js",
    $components . "angular-ui-router/release/angular-ui-router{$min}.js",
    $components . "angular-resource/angular-resource{$min}.js",
    $components . "angular-sanitize/angular-sanitize{$min}.js",
    $components . "ng-timeago/ngtimeago.js",
    $components . "angular-gettext/dist/angular-gettext{$min}.js",
    $components . "ng-file-upload/angular-file-upload-all{$min}.js",
    $components . "angular-material/angular-material{$min}.js",
    $components . "angular-animate/angular-animate{$min}.js",
    $components . "angular-aria/angular-aria{$min}.js",
    $components . "angular-messages/angular-messages{$min}.js",
    // $components . "ngInfiniteScroll/build/ng-infinite-scroll{$min}.js",
    $js_base_path . "ng-infinite-scroll.js",
    $js_base_path . "timeout.js",
    //custom
    $js_base_path . "app.js",
    $js_base_path . "config.js",
    $js_base_path . "filter.js",
    $js_base_path . "factory.js",
    $js_base_path . "controller.js",
    $js_base_path . "directive.js",
    $js_base_path . "translations.js",
    $js_base_path . "custom.js"
);
foreach ($js_paths as $js_path) {
    $clientScript->registerScriptFile($js_path.'?v='.Yii::app()->params['version'], CClientScript::POS_END);
}

Yii::app()->clientScript->registerScript('version', "var version = '" . Yii::app()->params['version'] . "'", CClientScript::POS_HEAD);
Yii::app()->clientScript->registerScript('base', "var base = '" . Yii::app()->request->baseUrl . "'", CClientScript::POS_HEAD);
?>