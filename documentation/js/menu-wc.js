'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">FalconFitAdmin documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AboutPageModule.html" data-type="entity-link" >AboutPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AboutPageModule-eddb88711f1f85960eef652dafbfa7dc2b52914d44a250a3eab9f7cd74b413576df34eef977d42d4c48d73142855aec56c21f4a957f86972ac54a7238f250821"' : 'data-bs-target="#xs-components-links-module-AboutPageModule-eddb88711f1f85960eef652dafbfa7dc2b52914d44a250a3eab9f7cd74b413576df34eef977d42d4c48d73142855aec56c21f4a957f86972ac54a7238f250821"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AboutPageModule-eddb88711f1f85960eef652dafbfa7dc2b52914d44a250a3eab9f7cd74b413576df34eef977d42d4c48d73142855aec56c21f4a957f86972ac54a7238f250821"' :
                                            'id="xs-components-links-module-AboutPageModule-eddb88711f1f85960eef652dafbfa7dc2b52914d44a250a3eab9f7cd74b413576df34eef977d42d4c48d73142855aec56c21f4a957f86972ac54a7238f250821"' }>
                                            <li class="link">
                                                <a href="components/AboutPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AboutPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AboutPageRoutingModule.html" data-type="entity-link" >AboutPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-b464094fd8b70dec75d99ee960c3225d4508ee686fbbbb969880b79b5340ebf5b9d96367819e71960df8e3d73eb0ec484a938e3b77e915acafa91fb96e5d9027"' : 'data-bs-target="#xs-components-links-module-AppModule-b464094fd8b70dec75d99ee960c3225d4508ee686fbbbb969880b79b5340ebf5b9d96367819e71960df8e3d73eb0ec484a938e3b77e915acafa91fb96e5d9027"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-b464094fd8b70dec75d99ee960c3225d4508ee686fbbbb969880b79b5340ebf5b9d96367819e71960df8e3d73eb0ec484a938e3b77e915acafa91fb96e5d9027"' :
                                            'id="xs-components-links-module-AppModule-b464094fd8b70dec75d99ee960c3225d4508ee686fbbbb969880b79b5340ebf5b9d96367819e71960df8e3d73eb0ec484a938e3b77e915acafa91fb96e5d9027"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BarcodeScannerPageModule.html" data-type="entity-link" >BarcodeScannerPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-BarcodeScannerPageModule-0f033804c8c62a8d08c41b7abb14c7fccf47d5968e12ef743306f6c8dd6725f0ed9d67c162d792178c014725f1e4ba820d0f6ea719af4087f60e3e76e19f5eca"' : 'data-bs-target="#xs-components-links-module-BarcodeScannerPageModule-0f033804c8c62a8d08c41b7abb14c7fccf47d5968e12ef743306f6c8dd6725f0ed9d67c162d792178c014725f1e4ba820d0f6ea719af4087f60e3e76e19f5eca"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BarcodeScannerPageModule-0f033804c8c62a8d08c41b7abb14c7fccf47d5968e12ef743306f6c8dd6725f0ed9d67c162d792178c014725f1e4ba820d0f6ea719af4087f60e3e76e19f5eca"' :
                                            'id="xs-components-links-module-BarcodeScannerPageModule-0f033804c8c62a8d08c41b7abb14c7fccf47d5968e12ef743306f6c8dd6725f0ed9d67c162d792178c014725f1e4ba820d0f6ea719af4087f60e3e76e19f5eca"' }>
                                            <li class="link">
                                                <a href="components/BarcodeScannerPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BarcodeScannerPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BarcodeScanningModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BarcodeScanningModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BarcodeScannerPageRoutingModule.html" data-type="entity-link" >BarcodeScannerPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DumbbellPageModule.html" data-type="entity-link" >DumbbellPageModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DumbbellPageRoutingModule.html" data-type="entity-link" >DumbbellPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ExercisePageModule.html" data-type="entity-link" >ExercisePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ExercisePageModule-474d68a03be6f523f07a4b39b3db924a7d965276c0300f57f910f42a952381e8479c7f3ea837a017e46671a2538f0d065736035d2c1b15adb0590b2ee1253c27"' : 'data-bs-target="#xs-components-links-module-ExercisePageModule-474d68a03be6f523f07a4b39b3db924a7d965276c0300f57f910f42a952381e8479c7f3ea837a017e46671a2538f0d065736035d2c1b15adb0590b2ee1253c27"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ExercisePageModule-474d68a03be6f523f07a4b39b3db924a7d965276c0300f57f910f42a952381e8479c7f3ea837a017e46671a2538f0d065736035d2c1b15adb0590b2ee1253c27"' :
                                            'id="xs-components-links-module-ExercisePageModule-474d68a03be6f523f07a4b39b3db924a7d965276c0300f57f910f42a952381e8479c7f3ea837a017e46671a2538f0d065736035d2c1b15adb0590b2ee1253c27"' }>
                                            <li class="link">
                                                <a href="components/ExercisePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExercisePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ExercisePageRoutingModule.html" data-type="entity-link" >ExercisePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageModule.html" data-type="entity-link" >HomePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HomePageModule-949473a5af0f4dc71f3cfcaeb5447e9963134a2da0d60a25c907c8446f661eeb52b49e059d84a34be6a47e0b74e822f001a8499de991e3adb4d98eb722a6e114"' : 'data-bs-target="#xs-components-links-module-HomePageModule-949473a5af0f4dc71f3cfcaeb5447e9963134a2da0d60a25c907c8446f661eeb52b49e059d84a34be6a47e0b74e822f001a8499de991e3adb4d98eb722a6e114"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomePageModule-949473a5af0f4dc71f3cfcaeb5447e9963134a2da0d60a25c907c8446f661eeb52b49e059d84a34be6a47e0b74e822f001a8499de991e3adb4d98eb722a6e114"' :
                                            'id="xs-components-links-module-HomePageModule-949473a5af0f4dc71f3cfcaeb5447e9963134a2da0d60a25c907c8446f661eeb52b49e059d84a34be6a47e0b74e822f001a8499de991e3adb4d98eb722a6e114"' }>
                                            <li class="link">
                                                <a href="components/HomePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageRoutingModule.html" data-type="entity-link" >HomePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageModule.html" data-type="entity-link" >LoginPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LoginPageModule-cb9efd8b15cdcdc4351748154bb571d35b66c60f6d02223a8405d25ee1a1794499f842e606939a84f841226124e8d9f55196fbd33e457226cf4734344edf44d1"' : 'data-bs-target="#xs-components-links-module-LoginPageModule-cb9efd8b15cdcdc4351748154bb571d35b66c60f6d02223a8405d25ee1a1794499f842e606939a84f841226124e8d9f55196fbd33e457226cf4734344edf44d1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginPageModule-cb9efd8b15cdcdc4351748154bb571d35b66c60f6d02223a8405d25ee1a1794499f842e606939a84f841226124e8d9f55196fbd33e457226cf4734344edf44d1"' :
                                            'id="xs-components-links-module-LoginPageModule-cb9efd8b15cdcdc4351748154bb571d35b66c60f6d02223a8405d25ee1a1794499f842e606939a84f841226124e8d9f55196fbd33e457226cf4734344edf44d1"' }>
                                            <li class="link">
                                                <a href="components/LoginPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageRoutingModule.html" data-type="entity-link" >LoginPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MachineDetailsPageModule.html" data-type="entity-link" >MachineDetailsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-MachineDetailsPageModule-e8372ea2eb18e7c3ee6d2c5caf8b6d3669d7c6d5b2082d246ae9e3404368ed392b4e2c996e34ae7426ece1e0cab1ffb752456a88a3f541cf390e9fe9464863df"' : 'data-bs-target="#xs-components-links-module-MachineDetailsPageModule-e8372ea2eb18e7c3ee6d2c5caf8b6d3669d7c6d5b2082d246ae9e3404368ed392b4e2c996e34ae7426ece1e0cab1ffb752456a88a3f541cf390e9fe9464863df"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MachineDetailsPageModule-e8372ea2eb18e7c3ee6d2c5caf8b6d3669d7c6d5b2082d246ae9e3404368ed392b4e2c996e34ae7426ece1e0cab1ffb752456a88a3f541cf390e9fe9464863df"' :
                                            'id="xs-components-links-module-MachineDetailsPageModule-e8372ea2eb18e7c3ee6d2c5caf8b6d3669d7c6d5b2082d246ae9e3404368ed392b4e2c996e34ae7426ece1e0cab1ffb752456a88a3f541cf390e9fe9464863df"' }>
                                            <li class="link">
                                                <a href="components/MachineDetailsPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MachineDetailsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MachineDetailsPageRoutingModule.html" data-type="entity-link" >MachineDetailsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MachinePageModule.html" data-type="entity-link" >MachinePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-MachinePageModule-9f1488eedf26905eb36023638f2ed73d12cc4706d8cf81c42bca3a75ed1d84fe743b77804f2dd7f01fb314c2da359d3d4a51a4d15be77b515526b81ac073b82a"' : 'data-bs-target="#xs-components-links-module-MachinePageModule-9f1488eedf26905eb36023638f2ed73d12cc4706d8cf81c42bca3a75ed1d84fe743b77804f2dd7f01fb314c2da359d3d4a51a4d15be77b515526b81ac073b82a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MachinePageModule-9f1488eedf26905eb36023638f2ed73d12cc4706d8cf81c42bca3a75ed1d84fe743b77804f2dd7f01fb314c2da359d3d4a51a4d15be77b515526b81ac073b82a"' :
                                            'id="xs-components-links-module-MachinePageModule-9f1488eedf26905eb36023638f2ed73d12cc4706d8cf81c42bca3a75ed1d84fe743b77804f2dd7f01fb314c2da359d3d4a51a4d15be77b515526b81ac073b82a"' }>
                                            <li class="link">
                                                <a href="components/MachinePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MachinePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MachinePageRoutingModule.html" data-type="entity-link" >MachinePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RegisterPageModule.html" data-type="entity-link" >RegisterPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RegisterPageModule-7b9dc9494bfbcd40efead9265f1f50360119ca69882cf7e670b66be3c1aaa87656a89e31ed869a1ee002187ca2348f10f82a579b164b4d024fe363393bf63b6c"' : 'data-bs-target="#xs-components-links-module-RegisterPageModule-7b9dc9494bfbcd40efead9265f1f50360119ca69882cf7e670b66be3c1aaa87656a89e31ed869a1ee002187ca2348f10f82a579b164b4d024fe363393bf63b6c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegisterPageModule-7b9dc9494bfbcd40efead9265f1f50360119ca69882cf7e670b66be3c1aaa87656a89e31ed869a1ee002187ca2348f10f82a579b164b4d024fe363393bf63b6c"' :
                                            'id="xs-components-links-module-RegisterPageModule-7b9dc9494bfbcd40efead9265f1f50360119ca69882cf7e670b66be3c1aaa87656a89e31ed869a1ee002187ca2348f10f82a579b164b4d024fe363393bf63b6c"' }>
                                            <li class="link">
                                                <a href="components/RegisterPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RegisterPageRoutingModule.html" data-type="entity-link" >RegisterPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedModule-767c54f103eb408db0639dca04fc776401e3540a5a4ff5cdaa6790b78b92c2ac4d1c373f70aa6c7b3503b5128a57788da28da74c712253fb8da231d2506a7032"' : 'data-bs-target="#xs-components-links-module-SharedModule-767c54f103eb408db0639dca04fc776401e3540a5a4ff5cdaa6790b78b92c2ac4d1c373f70aa6c7b3503b5128a57788da28da74c712253fb8da231d2506a7032"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-767c54f103eb408db0639dca04fc776401e3540a5a4ff5cdaa6790b78b92c2ac4d1c373f70aa6c7b3503b5128a57788da28da74c712253fb8da231d2506a7032"' :
                                            'id="xs-components-links-module-SharedModule-767c54f103eb408db0639dca04fc776401e3540a5a4ff5cdaa6790b78b92c2ac4d1c373f70aa6c7b3503b5128a57788da28da74c712253fb8da231d2506a7032"' }>
                                            <li class="link">
                                                <a href="components/ExerciseFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExerciseFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MachineFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MachineFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MachineSelectableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MachineSelectableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MapComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MapComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MapModuleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MapModuleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PictureSelectableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PictureSelectableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RoleSelectableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleSelectableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RoutingBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoutingBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ToolbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToolbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-SharedModule-767c54f103eb408db0639dca04fc776401e3540a5a4ff5cdaa6790b78b92c2ac4d1c373f70aa6c7b3503b5128a57788da28da74c712253fb8da231d2506a7032"' : 'data-bs-target="#xs-directives-links-module-SharedModule-767c54f103eb408db0639dca04fc776401e3540a5a4ff5cdaa6790b78b92c2ac4d1c373f70aa6c7b3503b5128a57788da28da74c712253fb8da231d2506a7032"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SharedModule-767c54f103eb408db0639dca04fc776401e3540a5a4ff5cdaa6790b78b92c2ac4d1c373f70aa6c7b3503b5128a57788da28da74c712253fb8da231d2506a7032"' :
                                        'id="xs-directives-links-module-SharedModule-767c54f103eb408db0639dca04fc776401e3540a5a4ff5cdaa6790b78b92c2ac4d1c373f70aa6c7b3503b5128a57788da28da74c712253fb8da231d2506a7032"' }>
                                        <li class="link">
                                            <a href="directives/CustomLabelDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomLabelDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/RoleDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-SharedModule-767c54f103eb408db0639dca04fc776401e3540a5a4ff5cdaa6790b78b92c2ac4d1c373f70aa6c7b3503b5128a57788da28da74c712253fb8da231d2506a7032"' : 'data-bs-target="#xs-pipes-links-module-SharedModule-767c54f103eb408db0639dca04fc776401e3540a5a4ff5cdaa6790b78b92c2ac4d1c373f70aa6c7b3503b5128a57788da28da74c712253fb8da231d2506a7032"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-767c54f103eb408db0639dca04fc776401e3540a5a4ff5cdaa6790b78b92c2ac4d1c373f70aa6c7b3503b5128a57788da28da74c712253fb8da231d2506a7032"' :
                                            'id="xs-pipes-links-module-SharedModule-767c54f103eb408db0639dca04fc776401e3540a5a4ff5cdaa6790b78b92c2ac4d1c373f70aa6c7b3503b5128a57788da28da74c712253fb8da231d2506a7032"' }>
                                            <li class="link">
                                                <a href="pipes/ShowPasswordPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShowPasswordPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserListPageModule.html" data-type="entity-link" >UserListPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UserListPageModule-83badd1eda7c93ff616f90090f2dea49a5db1e4e0ac398a63ee0b4f9218490702a8254deb4f47b81f0f5f29b9e17d18a80a519187b689b0ebe8f8efb123f1a69"' : 'data-bs-target="#xs-components-links-module-UserListPageModule-83badd1eda7c93ff616f90090f2dea49a5db1e4e0ac398a63ee0b4f9218490702a8254deb4f47b81f0f5f29b9e17d18a80a519187b689b0ebe8f8efb123f1a69"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserListPageModule-83badd1eda7c93ff616f90090f2dea49a5db1e4e0ac398a63ee0b4f9218490702a8254deb4f47b81f0f5f29b9e17d18a80a519187b689b0ebe8f8efb123f1a69"' :
                                            'id="xs-components-links-module-UserListPageModule-83badd1eda7c93ff616f90090f2dea49a5db1e4e0ac398a63ee0b4f9218490702a8254deb4f47b81f0f5f29b9e17d18a80a519187b689b0ebe8f8efb123f1a69"' }>
                                            <li class="link">
                                                <a href="components/UserListPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserListPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserListPageRoutingModule.html" data-type="entity-link" >UserListPageRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/DumbbellPage.html" data-type="entity-link" >DumbbellPage</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BaseMediaService.html" data-type="entity-link" >BaseMediaService</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseService.html" data-type="entity-link" >BaseService</a>
                            </li>
                            <li class="link">
                                <a href="classes/StrapiMediaService.html" data-type="entity-link" >StrapiMediaService</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BaseAuthenticationService.html" data-type="entity-link" >BaseAuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BaseRepositoryFirebaseService.html" data-type="entity-link" >BaseRepositoryFirebaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BaseRepositoryHttpService.html" data-type="entity-link" >BaseRepositoryHttpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BaseRepositoryLocalStorageService.html" data-type="entity-link" >BaseRepositoryLocalStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExerciseLocalStorageMapping.html" data-type="entity-link" >ExerciseLocalStorageMapping</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExerciseMappingFirebaseService.html" data-type="entity-link" >ExerciseMappingFirebaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExerciseMappingStrapi.html" data-type="entity-link" >ExerciseMappingStrapi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExerciseService.html" data-type="entity-link" >ExerciseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirebaseAuthenticationService.html" data-type="entity-link" >FirebaseAuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirebaseAuthMappingService.html" data-type="entity-link" >FirebaseAuthMappingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirebaseCollectionSubscriptionService.html" data-type="entity-link" >FirebaseCollectionSubscriptionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirebaseMediaService.html" data-type="entity-link" >FirebaseMediaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MachineLocalStorageMapping.html" data-type="entity-link" >MachineLocalStorageMapping</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MachineMappingFirebaseService.html" data-type="entity-link" >MachineMappingFirebaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MachineMappingStrapi.html" data-type="entity-link" >MachineMappingStrapi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MachineService.html" data-type="entity-link" >MachineService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlaceMappingFirebaseService.html" data-type="entity-link" >PlaceMappingFirebaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlaceMappingStrapi.html" data-type="entity-link" >PlaceMappingStrapi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlaceService.html" data-type="entity-link" >PlaceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoleManagerService.html" data-type="entity-link" >RoleManagerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StrapiAuthenticationService.html" data-type="entity-link" >StrapiAuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StrapiAuthMappingService.html" data-type="entity-link" >StrapiAuthMappingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StrapiRepositoryService.html" data-type="entity-link" >StrapiRepositoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TranslationService.html" data-type="entity-link" >TranslationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserffMappingFirebaseService.html" data-type="entity-link" >UserffMappingFirebaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserffMappingStrapi.html" data-type="entity-link" >UserffMappingStrapi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserffService.html" data-type="entity-link" >UserffService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CollectionChange.html" data-type="entity-link" >CollectionChange</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Data.html" data-type="entity-link" >Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Data-1.html" data-type="entity-link" >Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Data-2.html" data-type="entity-link" >Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Data-3.html" data-type="entity-link" >Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Data-4.html" data-type="entity-link" >Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Exercise.html" data-type="entity-link" >Exercise</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExerciseAttributes.html" data-type="entity-link" >ExerciseAttributes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExerciseData.html" data-type="entity-link" >ExerciseData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExerciseRaw.html" data-type="entity-link" >ExerciseRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExerciseRaw-1.html" data-type="entity-link" >ExerciseRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirebaseExercise.html" data-type="entity-link" >FirebaseExercise</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirebaseMachine.html" data-type="entity-link" >FirebaseMachine</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirebaseMachineDetails.html" data-type="entity-link" >FirebaseMachineDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirebasePlace.html" data-type="entity-link" >FirebasePlace</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirebaseUserff.html" data-type="entity-link" >FirebaseUserff</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Formats.html" data-type="entity-link" >Formats</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GroupAttributes.html" data-type="entity-link" >GroupAttributes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GroupRaw.html" data-type="entity-link" >GroupRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GroupRaw-1.html" data-type="entity-link" >GroupRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAuthentication.html" data-type="entity-link" >IAuthentication</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAuthMapping.html" data-type="entity-link" >IAuthMapping</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBaseMapping.html" data-type="entity-link" >IBaseMapping</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBaseRepository.html" data-type="entity-link" >IBaseRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBaseService.html" data-type="entity-link" >IBaseService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICollectionSubscription.html" data-type="entity-link" >ICollectionSubscription</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IExerciseRepository.html" data-type="entity-link" >IExerciseRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IExerciseService.html" data-type="entity-link" >IExerciseService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMachineRepository.html" data-type="entity-link" >IMachineRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMachineService.html" data-type="entity-link" >IMachineService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPlaceRepository.html" data-type="entity-link" >IPlaceRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPlaceService.html" data-type="entity-link" >IPlaceService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStrapiAuthentication.html" data-type="entity-link" >IStrapiAuthentication</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUserffRepository.html" data-type="entity-link" >IUserffRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUserffService.html" data-type="entity-link" >IUserffService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Large.html" data-type="entity-link" >Large</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LocationMarker.html" data-type="entity-link" >LocationMarker</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Machine.html" data-type="entity-link" >Machine</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MachineAttributes.html" data-type="entity-link" >MachineAttributes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MachineAttributes-1.html" data-type="entity-link" >MachineAttributes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MachineData.html" data-type="entity-link" >MachineData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MachineData-1.html" data-type="entity-link" >MachineData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MachineRaw.html" data-type="entity-link" >MachineRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MachineRaw-1.html" data-type="entity-link" >MachineRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MachineRaw-2.html" data-type="entity-link" >MachineRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MediaRaw.html" data-type="entity-link" >MediaRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MediaRaw-1.html" data-type="entity-link" >MediaRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Medium.html" data-type="entity-link" >Medium</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Meta.html" data-type="entity-link" >Meta</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Meta-1.html" data-type="entity-link" >Meta</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Model.html" data-type="entity-link" >Model</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Paginated.html" data-type="entity-link" >Paginated</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaginatedRaw.html" data-type="entity-link" >PaginatedRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Pagination.html" data-type="entity-link" >Pagination</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PersonAttributes.html" data-type="entity-link" >PersonAttributes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PersonData.html" data-type="entity-link" >PersonData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PersonRaw.html" data-type="entity-link" >PersonRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Place.html" data-type="entity-link" >Place</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlaceAttributes.html" data-type="entity-link" >PlaceAttributes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlaceData.html" data-type="entity-link" >PlaceData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlaceRaw.html" data-type="entity-link" >PlaceRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProviderMetadata.html" data-type="entity-link" >ProviderMetadata</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchParams.html" data-type="entity-link" >SearchParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SignInPayload.html" data-type="entity-link" >SignInPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SignUpPayload.html" data-type="entity-link" >SignUpPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Small.html" data-type="entity-link" >Small</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiMedia.html" data-type="entity-link" >StrapiMedia</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiMediaData.html" data-type="entity-link" >StrapiMediaData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiMeResponse.html" data-type="entity-link" >StrapiMeResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiSignIn.html" data-type="entity-link" >StrapiSignIn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiSignInResponse.html" data-type="entity-link" >StrapiSignInResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiSignUp.html" data-type="entity-link" >StrapiSignUp</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiSignUpResponse.html" data-type="entity-link" >StrapiSignUpResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiUser.html" data-type="entity-link" >StrapiUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Superset.html" data-type="entity-link" >Superset</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Thumbnail.html" data-type="entity-link" >Thumbnail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Userff.html" data-type="entity-link" >Userff</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserRaw.html" data-type="entity-link" >UserRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserRaw-1.html" data-type="entity-link" >UserRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserRaw-2.html" data-type="entity-link" >UserRaw</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});