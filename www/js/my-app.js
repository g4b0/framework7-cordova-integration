/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var isAndroid = Framework7.prototype.device.android === true;
var isIos = Framework7.prototype.device.ios === true;

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

/*
 * Utile per usare costrutti tipo {{#if @global.android}} {{/if}} 
 * all'interno dei file HTML
 * @type Template7
 */
//Template7.global = {
//    android: isAndroid,
//    ios: isIos
//};

// Initialize app
var myApp = new Framework7({
    // Enable Material theme for Android device only
    material: isAndroid ? true : false,
    // Enable Template7 pages
    //template7Pages: true
});

// Add view
var mainView = myApp.addView('.view-main', {
    // Material doesn't support it but don't worry about it
    // F7 will ignore it for Material theme
    dynamicNavbar: true
});

// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page
    myApp.alert('Here comes About page1');
});

// Option 2. Using one 'pageInit' event handler for all pages:
//$$(document).on('pageInit', function (e) {
//    // Get page data from event data
//    var page = e.detail.page;
//
//    if (page.name === 'about') {
//        // Following code will be executed for page with data-page attribute equal to "about"
//        //myApp.alert('Here comes About page2');
//    }
//})

// Option 3. Using live 'pageInit' event handlers for each page
//$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
//    // Following code will be executed for page with data-page attribute equal to "about"
//    myApp.alert('Here comes About page3');
//})
