// function DesignStudioItem(user, dsItemJSON, useLocalStorage) {
// 	this.user = user;
// 	this.productId = dsItemJSON.productId;
// 	this.productType = dsItemJSON.productName;
// 	this.typeId = dsItemJSON.typeId;
// 	this.productWebDescription = dsItemJSON.productWebDescription;
// 	this.typeCode = dsItemJSON.typeCode;
// 	this.productSize = dsItemJSON.productSize;
// 	this.productStylecode = dsItemJSON.productStylecode;
// 	this.collectionTypeCategoryId = dsItemJSON.collectionTypeCategoryId;
// 	this.designFamilyCategoryId = dsItemJSON.designFamilyCategoryId;
// 	this.productDSViewSet = dsItemJSON.productDSViewSet;
// 	this.productViewSet = dsItemJSON.productViewSet;
// 	this.productAnimatedViewSet = dsItemJSON.productAnimatedViewSet;
// 	this.colorPalette = dsItemJSON.colorPalette;
// 	this.originalColors = (notNullOrEmpty(dsItemJSON.originalColors))? dsItemJSON.originalColors.colors : [];
// 	this.itemType = dsItemJSON.itemType;
// 	this.templateStylecode = dsItemJSON.templateStylecode;
// 	this.sessionId = dsItemJSON.sessionId || user.sessionId;
// 	this.documentId = dsItemJSON.documentId;
// 	this.previewImageURL = dsItemJSON.previewImageURL;
// 	this.previewSmallImageURL = dsItemJSON.previewSmallImageURL;
// 	this.previewBackSmallImageURL = dsItemJSON.previewBackSmallImageURL;
// 	this.iceUrl = dsItemJSON.iceUrl;
// 	this.responsiveIceUrl = dsItemJSON.responsiveIceUrl;
// 	this.imprintData = dsItemJSON.productImprintData;
// 	this.userDesignNotes = dsItemJSON.userDesignNotes;
// 	this.isModified =  (dsItemJSON.itemType.toUpperCase() === 'IMPRINT' && !notNullOrZeroLength(dsItemJSON.productImprintData))? true : false;
// 	this.isViewed = dsItemJSON.viewed || false;
// 	this.quantity = dsItemJSON.quantity;
// 	this.originalQuantity = this.quantity;
// 	this.itemsPerBox = dsItemJSON.itemsPerBox;
// 	this.substrateId = dsItemJSON.productSubstrateId;
// 	this.parentId = (dsItemJSON.parentId !== dsItemJSON.productId)? dsItemJSON.parentId : null;
// 	this.isParent = dsItemJSON.isParent || false;
// 	this.unitPrice = formatPrice(dsItemJSON.unitPrice);
// 	this.discountPercentage = dsItemJSON.discountPercentage || 0;
// 	this.discountedUnitPrice = dsItemJSON.discountedUnitPrice;
// 	this.price = formatPrice(dsItemJSON.productPrice);
// 	this.orderItemId = dsItemJSON.orderItemId;
// 	this.itemErrors = dsItemJSON.itemErrors;
// 	this.isShippingService = dsItemJSON.isShippingService || false;
// 	this.canHaveShippingService = dsItemJSON.canHaveShippingService || false;
// 	this.canHaveMailingList = dsItemJSON.canHaveMailingList || false;
// 	this.groupId;
// 	this.approved = dsItemJSON.approved || (dsItemJSON.userApprovalInitials == 'yes') || false;
// 	this.mailWithoutEnvelope = dsItemJSON.mailWithoutEnvelope || false;
// 	this.extraShippedQuantity = dsItemJSON.extraShippedQuantity || 0;
// 	this.selectedAttributes = dsItemJSON.selectedAttributes;
// 	this.availableAttributes = dsItemJSON.availableAttributes;
// 	this.substrateAttribute = dsItemJSON.substrateAttribute;
// 	this.compositeEnvelopes = dsItemJSON.compositeEnvelopes;
// 	this.envelopeAttribute = null;
// 	this.inkColorAttribute = null;

// 	this.topLevelItem = true;
// 	this.originalTemplateStylecode = dsItemJSON.productStylecode;
// 	this.productRequiredWithTypeIds = dsItemJSON.productRequiredWithTypeIds;
// 	this.productNotAllowedWithTypeIds = dsItemJSON.productNotAllowedWithTypeIds;

// 	let isMultiviewItem = false;

// 	for (let j = 0; j < dsItemJSON.productDSViewSet.length; j = j + 1) {
// 		if (!_.isNull(dsItemJSON.productDSViewSet[j].additionalSourceData) && !_.isUndefined(dsItemJSON.productDSViewSet[j].additionalSourceData) && !_.isEmpty(dsItemJSON.productDSViewSet[j].additionalSourceData)
// 				&& dsItemJSON.productDSViewSet[j].scene.toLowerCase().indexOf('_scenebuilder') > -1) {
// 			isMultiviewItem = true;
// 			break;
// 		}
// 	}
// 	this.isMultidocument = isMultiviewItem;

// 	this.isSample = dsItemJSON.isSample;

// 	if(!_.isNull(dsItemJSON.groupId) && !_.isEmpty(dsItemJSON.groupId)){
// 		this.groupId = dsItemJSON.groupId;
// 		if(_.isNull(designStudio.groupId) || _.isEmpty(designStudio.groupId)){
// 			designStudio.groupId = dsItemJSON.groupId;
// 		}
// 	} else if(!_.isNull(designStudio.groupId) && designStudio.groupId > 0){
// 		this.groupId = designStudio.groupId
// 	} else {
// 		designStudio.generateGroupId();
// 		this.groupId = designStudio.groupId
// 	}

// 	//LEGACY
// 	//var customerDoApplyImprintsPreference = (_.isNull(getCookie('msSkipDsImprints')) || _.isUndefined(getCookie('msSkipDsImprints')) || getCookie('msSkipDsImprints') === 'false');
// 	//CURRENT
// 	const customerDoApplyImprintsPreference = true; //Current assumption is to always show DS imprint form, even if they skip previewing imprints during browse experience
// 	//FUTURE POSSIBILITY (if we want customer to opt out of this DS experience)
// 	//var customerDoApplyImprintsPreference = !getDoImprintApplicationToImages_sitePreference();

// 	this.isLockedForImprintEditing = ((dsItemJSON.allowImprints && designStudio.dsJSON.showImprintForm) && customerDoApplyImprintsPreference) || false;
// 	if(this.isParent && designStudio.defaultQuantity < 1){
// 		designStudio.defaultQuantity = this.originalQuantity;
// 	}

// 	this.viewDimensions = [];
// 	this.views = [];
// 	this.proofingViews = [];

// 	this.isSaved = false;
// 	this.proofImageGenerated = false;
// 	this.useLocalStorage = useLocalStorage || false;

// 	this.mailingServiceKey = null;
// 	this.mailingListInfo = null;
// 	this.selectedMailingListServiceKey = (notNullOrEmpty(dsItemJSON.mailingListServiceKey))? dsItemJSON.mailingListServiceKey : null;
// 	this.selectedMailingListIds = (notNullOrEmpty(dsItemJSON.mailingListId))? dsItemJSON.mailingListId : null;
// 	this.selectedMailingLists = (notNullOrEmpty(dsItemJSON.mailingListArray))? dsItemJSON.mailingListArray : null;

// 	this.envelopeAttribute = this.getSelectedEnvelopeDesign();

// 	//IDS Objects
// 	this.IDSObject = {};
// 	this.templateVariations = [];
// 	this.selectedVariation = (notNullOrEmpty(dsItemJSON.variationAttribute))? dsItemJSON.variationAttribute : null;
// 	this.colorSwatches = [];
// 	this.textBoxes = [];
// 	this.imageBoxes = [];
// 	this.trackUneditedElements = false;

// 	this.isWorking = false;
// 	this.isInitialized = false;
// 	this.canBeRemoved = true;
// 	this.getDocumentCallCount = 0;

// 	this.imageBoxesToMerge = [];

// 	this.updatedBaselineJSON = null;

// 	this.applyingImprints = false;
// 	this.generatingAnimatedImage = false;
// 	this.generateAnimatedImage = true;
// 	this.waitingCount = 0;
// 	this.generateWaitingCount = 0;
// }

// let itemToLoad;
// const multidocumentQueue = [];
// let multidocumentRenderCount = 0;

// DesignStudioItem.prototype.loadItem = function(dsCallback) {
// 	designStudio.lockInterfaceAndShowProgressSpinner();

// 	//make sure callback is not lost by subsequent calls to load item that may
// 	if(dsCallback !== undefined){
// 		this.onItemLoadCallback = dsCallback;
// 	} else if(this.onItemLoadCallback){
// 		dsCallback = this.onItemLoadCallback;
// 	}

// 	if (this.IDSObject !== null && !$j.isEmptyObject(this.IDSObject) && !_.isNull(this.IDSObject.views) && !_.isUndefined(this.IDSObject.views) && this.IDSObject.views.length > 0) {
// 		if (this.productStylecode.indexOf('ENV') > -1) {
// 			this.hideIncorrectEnvelopeSubstrateViews();
// 		}

// 		if(this.isForKraftEnvelope()){
// 			this.updateColorsToBlackAndRender();
// 		} else {
// 			designStudio.renderItem(this);
// 		}
// 	} else {
// 		if (this.isDS() && this.isShippingService) {
// 			this.getViewDimensionsFromIDS(dsCallback);
// 		} else if (this.isShippingService) {
// 			designStudio.showMailingList();
// 		} else if (this.isMultidocument) {
// 			if (this.productStylecode.indexOf('ENV') > -1 || this.isRubberStamp()) {
// 				//render other items that might be on envelope
// 				const itemToLoad = this;
// 				let hasSubItems = false;
// 				let loadedMultidocItem = false;
// 				for(let i = 0, x = designStudio.dsItems.length; i < x; i = i + 1){
// 					if(designStudio.dsItems[i].isForEnvelope() || ((designStudio.dsItems[i].isEnvelope() || designStudio.dsItems[i].isMailingService()) && designStudio.dsItems[i].productStylecode.split('-')[1] == itemToLoad.productStylecode.split('-')[1])){
// 						hasSubItems = true;
// 						if(_.isNull(designStudio.dsItems[i].views) || _.isUndefined(designStudio.dsItems[i].views) || designStudio.dsItems[i].views.length <= 0){
// 							loadedMultidocItem = true;
// 							/*if(_.isNull(designStudio.dsItems[i].documentId) || _.isUndefined(designStudio.dsItems[i].documentId)){
// 								designStudio.dsItems[i].getSingleDocumentId(
// 									this.getViewDimensionsFromIDS(function(){
// 										if(multidocumentQueue.length == 0){
// 											itemToLoad.getViewDimensionsFromIDS(dsCallback);
// 										}
// 									})
// 								);
// 							} else {*/
// 								designStudio.dsItems[i].getViewDimensionsFromIDS(function(){
// 									if(multidocumentQueue.length == 0){
// 										itemToLoad.getViewDimensionsFromIDS(dsCallback);
// 									}
// 								});
// 							//}
// 						}
// 					}
// 				}

// 				if(!loadedMultidocItem || !hasSubItems){
// 					//if(_.isNull(itemToLoad.views) || _.isUndefined(itemToLoad.views) || itemToLoad.views.length <= 0){
// 						itemToLoad.getViewDimensionsFromIDS(dsCallback);
// 					//} else {
// 					//	designStudio.renderItem(itemToLoad);
// 					//}
// 				}
// 			}

// 			//render actual item now
// 			//this.getViewDimensionsFromIDS(dsCallback);
// 		} else if (this.isDS() || designStudio.isDemo) {
// 			this.getViewDimensionsFromIDS(dsCallback);
// 		} else {
// 			if (this.productStylecode.indexOf('ENV') > -1) {
// 				this.hideIncorrectEnvelopeSubstrateViews();
// 			}
// 			this.loadStockItem();
// 			designStudio.renderItem(this);
// 		}
// 	}

// 	this.isViewed = true;
// 	if (designStudio.defaultQuantity === 0) {
// 		designStudio.defaultQuantity = this.quantity;
// 	}
// 	if (designStudio.defaultSubstrateId === 0) {
// 		designStudio.defaultSubstrateId = this.substrateId;
// 	}

// 	if (notNullOrEmpty(this.selectedMailingLists)) {
// 		designStudio.setSelectedMailingList(this.selectedMailingLists[0], this.selectedMailingLists);
// 	}
// };

// DesignStudioItem.prototype.getViewDimensionsFromIDS = function(dsCallback) {
// 	const idsURL = designStudio.baseIDSLocation + 'getViewDimensions?sessionId=' + this.sessionId + '&documentId=' + this.documentId + '&viewList=' + this.getAllViewSetString() + '&r=' + Math.random() + ':' + new Date().getTime(),
// 		dsi = this;

// 	if(!this.isWorking && !this.isInitialized){
// 		this.isWorking = true;
// 		$j.ajax({
// 			url: idsURL
// 		})
// 		.done(function(data) {
// 			let view;
// 			for (let i = 0, x = data.views.length; i < x; i = i + 1) {
// 				view = data.views[i];

// 				const dimensions = {};
// 				dimensions.sceneName = view.sceneName;
// 				dimensions.width = view.sceneCanvasWidth;
// 				dimensions.height = view.sceneCanvasHeight;
// 				dsi.viewDimensions.push(dimensions);

// 				if (view.sceneCanvasWidth < 1000) {
// 					designStudio.scaleMultiplier = 1;
// 				}
// 				if (view.sceneCanvasHeight < 1000) {
// 					designStudio.scaleMultiplier = 1;
// 				}
// 			}

// 			dsi.getDocumentFromIDS(dsCallback);
// 		});
// 	}
// };

// DesignStudioItem.prototype.getDocumentFromIDS = function(dsCallback) {
// 	//Example of call: http://www.trulyengaging.com/designtools/main/ajaxGetDTDoc/dtSessionId/20141009-DFA56405BA3511FC2F2686462AF51F87/dtDocumentId/47E64E99DA0E4836EC4B959720648943/dtCanvasHeight/502/dtCanvasWidth/922/dtIs3DProduct/true/dtTemplateId/A-10102/r/1413828140593:0.21440702211111784/initialColorPalette/null
// 	if(!this.isMultidocument || this.isRubberStamp()){
// 		//Normal templates
// 		const imprintData = '';
// 		if(designStudio.dsTextImprints && designStudio.dsTextImprints.textImprintsForm && !designStudio.dsJSON.showImprintForm &&
// 				!this.isModified && !this.isLockedForImprintEditing){

// 			if(!dsCallback){
// 				this.isLockedForImprintEditing = true;
// 				dsCallback = function(dsi){
// 					designStudio.applySavedImagesToCurrentItem(function(){
// 						//If form not set up for current item, set it up again because tags might be different (allows us to apply saved imprints not needed on first item)
// 						if(designStudio.dsTextImprints.targetStylecode != designStudio.currentDSItem.productStylecode){
// 							designStudio.dsTextImprints = new DesignStudioTextImprints(designStudio.dsJSON);
// 						}
// 						designStudio.dsTextImprints.applyFormImprintsToCurrentItem(false, designStudio.richTextEditor.standAloneSizeUpdate);
// 					});

// 				};
// 			}
// 		}

// 		const skipImageRender = (this.isLockedForImprintEditing) ? 'true' : 'false';

// 		let productViewString = this.getProductDSViewSetString();
// 		const envelopeItem = designStudio.getEnvelopeItem();
// 		const envrItems = designStudio.getItemsByProductType('ENVR');
// 		let nonMatchingEnvr = null;
// 		if(envelopeItem && envrItems){
// 			for(let j = 0; j < envrItems.length; j++){
// 				const envrItem = envrItems[j];

// 				if(envrItem.productStylecode.split('-')[1] != envelopeItem.productStylecode.split('-')[1]){
// 					nonMatchingEnvr = envrItem;
// 					break;
// 				}
// 			}
// 		}

// 		if((this.isForEnvelope() && _.isNull(nonMatchingEnvr)) || this.isMailingService() || (this.isForEnvelope() && !_.isNull(nonMatchingEnvr) && nonMatchingEnvr.productId != this.productId)){
// 			const envelopeMailingServiceItem = designStudio.getEnvelopeMailingServiceItem();
// 			if(envelopeItem && envelopeItem.isMultidocument){
// 				productViewString = envelopeItem.getProductDSViewSetString();
// 			} else if(envelopeMailingServiceItem && envelopeMailingServiceItem.isMultidocument){
// 				productViewString = envelopeMailingServiceItem.getProductDSViewSetString();
// 			}

// 			if(this.isMailingService() && envelopeItem){
// 				productViewString += '&sceneSpecificViewTagPrefix=ENVR';
// 			} else if(envelopeItem && !this.isENVRWithEnvelope()){
// 				productViewString += '&sceneSpecificViewTagPrefix=' + this.typeCode;
// 			}
// 			this.updateSelectedAttributes();
// 			if(this.isGuestAddress()){
// 				designStudio.loadMailingListsForItem(this);
// 			}
// 		}

// 		let templateStylecode = this.templateStylecode;
// 		if(designStudio.envelopeMailingServiceProductTypes.indexOf(this.typeCode) > -1){
// 			const defaultDesign = this.getDefaultEnvelopeDesign();
// 			if(!_.isNull(defaultDesign)){
// 				templateStylecode = defaultDesign.template;
// 			}
// 		}

// 		let sourcesJSON = null;
// 		if(!_.isNull(designStudio.dsJSON.attributeSubstrateToUse) && !_.isUndefined(designStudio.dsJSON.attributeSubstrateToUse)){
// 			const additionalSourceJSON = {"type":"substrate", "substrate": designStudio.dsJSON.attributeSubstrateToUse.toLowerCase().replace(/\s/g, '')};
// 			if(_.isNull(sourcesJSON)){
// 				sourcesJSON = [];
// 			}
// 			sourcesJSON.push(additionalSourceJSON);
// 		}

// 		if(this.isSample && this.quantity == 1 && (designStudio.dsJSON.marketId === 517 || designStudio.dsJSON.marketId === 524)){
// 			const sampleJSON = {};
// 			sampleJSON.type = 'sample';
// 			sampleJSON.sample = 'true';
// 			if(_.isNull(sourcesJSON)){
// 				sourcesJSON = [];
// 			}
// 			sourcesJSON.push(sampleJSON);
// 		}

// 		if(this.isGuestAddress())
// 			productViewString = this.includeEnvgEditingViewOnViewList(productViewString);

// 		var idsURL = designStudio.baseIDSLocation + 'getDocument?sessionId=' + this.sessionId + '&documentId=' + this.documentId + '&viewList=' + productViewString + '&templateId=' + templateStylecode + '&skipImageRender=' + skipImageRender + '&initialColorPalette=' + ((this.isForKraftEnvelope() && !this.approved)? 's:monochrome-for-kraft:' : ((this.colorPalette !== undefined && this.colorPalette !== null && this.colorPalette !== '')? this.colorPalette : null)) + imprintData + '&r=' + Math.random() + ':' + new Date().getTime() + ((!_.isNull(sourcesJSON))? '&additionalSourceList=' + JSON.stringify(sourcesJSON) : ''),
// 		dsi = this;
// 	//	if (smallerThanC()) {
// 	//		idsURL += '&scale=' + (designStudio.scale * designStudio.scaleMultiplier);
// 	//	}

// 		if(skipImageRender == 'false' && this.colorPalette !== undefined && this.colorPalette !== null && this.colorPalette !== '' && (this.colorPalette.toLowerCase().indexOf('foil') > 0 || this.colorPalette.toLowerCase().indexOf('varnish') > 0)){
// 			idsURL += '&exportOverprintMasks=true';
// 		}

// 		if(this.hasVarnish()){
// 			idsURL += '&displayVarnish=true';
// 		}

// 		const variation = this.getSelectedVariationAttribute();
// 		if(!_.isNull(variation) && !_.isUndefined(variation)){
// 			idsURL += '&variation=' + variation.template;
// 		}

// 		let storedIDSItemData = null;
// 		if(dsi.useLocalStorage){
// 			const recoveryData = getDSRecoveryData();
// 			const storedIDSItemsData = JSON.parse(recoveryData.recoveryData_dsItems);
// 			$j.each(storedIDSItemsData, function(index, item){
// 				if(item.documentId == dsi.documentId && !storedIDSItemData && !$j.isEmptyObject(item.IDSObject)){
// 					storedIDSItemData = item.IDSObject;
// 				}
// 			});
// 		}

// 		const postFontLoadCallback = function() {
// 			//pre-load text editor
// 			if(designStudio.rteInitialized === undefined && dsi.textBoxes.length > 0 && !dsi.isLockedForImprintEditing){
// 				designStudio.rteInitialized = false;
// 				designStudio.currentTextBox = dsi.textBoxes[0];
// 				designStudio.richTextEditor.loadTextForEdit(dsi.textBoxes[0]);
// 			}

// 			if(dsCallback!== undefined && dsCallback !== null)
// 				dsCallback(dsi);
// 			else
// 				designStudio.renderItem(dsi);
// 		};

// 		if(storedIDSItemData){
// 			dsi.IDSObject = storedIDSItemData;
// 			dsi.updateFromIDS(storedIDSItemData);
// 			dsi.loadCommonFontsAndInsertItemSpecificFonts(postFontLoadCallback);
// 			dsi.useLocalStorage = false;

// 		} else {
// 			dsi.getDocumentCallCount++;

// 			$j.ajax({
// 				method: 'GET',
// 				url: idsURL,
// 				timeout: 300000,
// 				async: true
// 			})
// 			.done(function(data) {
// 				dsi.isInitialized = true;
// 				dsi.isWorking = false;
// 				dsi.getDocumentCallCount = 0;
// 				dsi.updateFromIDS(data);
// 				dsi.loadCommonFontsAndInsertItemSpecificFonts(postFontLoadCallback);
// 			})
// 			.fail(function(data) {
// 				MSGA.designStudio3.failedToGetDocument(dsi.productStylecode);
// 				dsi.isInitialized = false;
// 				dsi.isWorking = false;
// 				if(dsi.getDocumentCallCount < 6){
// 					setTimeout(function(){ dsi.getDocumentFromIDS(dsCallback); }, 2000);
// 				} else {
// 					if(designStudio.dsItems[0].documentId == dsi.documentId){
// 						HotTub.dialog.infoPopupWithText(
// 							"We're having some trouble",
// 							"Something went wrong loading Design Studio.  Please exit Design Studio and try again.",
// 							true,
// 							'Exit Design Studio',
// 							function(){
// 								HotTub.dialog.handleClose();
// 								designStudio.clearDsDataForExit();
// 								designStudio.close();
// 							});
// 					} else {
// 						HotTub.dialog.infoPopupWithText(
// 							"We're having some trouble",
// 							"Something went wrong loading this item.  Please try again or save your work to your account.",
// 							true,
// 							'OK',
// 							function(){
// 								HotTub.dialog.handleClose();
// 								designStudio.navigation.goToPreviousStep();
// 							});

// 					}
// 				}
// 			});
// 		}
// 	} else {
// 		dsi = this;
// 		dsi.isWorking = false;
// 		dsi.renderAndUpdateMultidocumentViews(dsCallback);
// 	}
// };

// DesignStudioItem.prototype.includeEnvgEditingViewOnViewList = function(viewString){
// 	if(!viewString) viewString = '';
// 	const view = this.getEnvgEditingView();
// 	if(view && viewString.indexOf(view.scene) === -1) {
// 		if(_.isEmpty(viewString.trim())){
// 			viewString = view.scene;
// 		} else {
// 			const paramParts = viewString.split('&');
// 			const viewList = paramParts[0].split(',');
// 			viewList.push(view.scene);
// 			viewString = viewList.join(',') + (paramParts.length > 1 ? '&' + paramParts[1] : '');
// 		}
// 	}
// 	return viewString;
// }

// DesignStudioItem.prototype.getEnvgEditingView = function(viewString){
// 	const views = this.productViewSet;
// 	for(let i = 0; views && i < views.length; i++){
// 		const view = views[i];
// 		if(view.scene.indexOf('envg') > -1 && view.scene.indexOf('_flat_') > -1){
// 			return view;
// 		}
// 	}
// 	return null;
// }

// DesignStudioItem.prototype.getViewForLayoutSceneName = function(){
// 	const views = this.productViewSet;
// 	if(views.length > 1){
// 		for(var i = 0; views && i < views.length; i++){
// 			var view = views[i];
// 			if(view.scene.indexOf('layout') > -1){
// 				if(designStudio.currentDSItem.typeCode == 'XG'){
// 					return view.scene.replace('xg_', 'xgl_');
// 				} else {
// 					return view.scene;
// 				}
// 			}
// 		}
// 		for(var i = 0; views && i < views.length; i++){
// 			var view = views[i];
// 			if(view.scene.indexOf('back') > -1){
// 				if(designStudio.currentDSItem.typeCode == 'XG'){
// 					return view.scene.replace('xg_', 'xgl_');
// 				} else {
// 					return view.scene;
// 				}
// 			}
// 		}
// 		for(var i = 0; views && i < views.length; i++){
// 			var view = views[i];
// 			if(view.scene.indexOf('_ds_') > -1){
// 				if(designStudio.currentDSItem.typeCode == 'XG'){
// 					return view.scene.replace('xg_', 'xgl_');
// 				} else {
// 					return view.scene;
// 				}
// 			}
// 		}
// 	} else {
// 		var view = views[i];
// 		if(designStudio.currentDSItem.typeCode == 'XG'){
// 			return view.scene.replace('xg_', 'xgl_');
// 		} else {
// 			return view.scene;
// 		}
// 	}
// 	return null;
// }

// DesignStudioItem.prototype.getFrontView = function(){
// 	const views = this.productViewSet;
// 	for(let i = 0; views && i < views.length; i++){
// 		const view = views[i];
// 		if(view.scene.indexOf('front') > -1){
// 			return view;
// 		}
// 	}
// 	return null;
// }

// DesignStudioItem.prototype.getBackView = function(){
// 	const views = this.productViewSet;
// 	for(let i = 0; views && i < views.length; i++){
// 		const view = views[i];
// 		if(view.scene.indexOf('back') > -1){
// 			return view;
// 		}
// 	}
// 	return null;
// }

// DesignStudioItem.prototype.loadStockItem = function() {
// 	if(!_.isNull(this.availableAttributes) && !_.isUndefined(this.availableAttributes) &&
// 		!_.isNull(this.availableAttributes.substrates) && !_.isUndefined(this.availableAttributes.substrates) && this.availableAttributes.substrates.length > 0 &&
// 		!_.isNull(this.selectedAttributes) && !_.isUndefined(this.selectedAttributes) && this.selectedAttributes.length == 0){
// 		this.selectedAttributes.push(this.availableAttributes.substrates[0]);
// 	}

// 	this.updateStockViews();

// 	designStudio.firstItemLoaded = true;
// };

// DesignStudioItem.prototype.updateFromIDS = function(dsDocumentJSON) {

// 	//Really shouldn't need this if text tags are collapsing and expanding correctly. No tags should disappear after an update.
// 	if(!_.isEmpty(this.IDSObject) && this.IDSObject.textTags){
// 		//Text tags shouldn't change based on response data once defined for an item
// 		dsDocumentJSON.textTags = this.IDSObject.textTags;
// 	}
// 	this.IDSObject = dsDocumentJSON;
// 	this.updateTemplateVariations();
// 	this.updateColorSwatches();
// 	this.updateTextBoxes();
// 	//if(!this.imageBoxes || this.imageBoxes.length === 0)
// 		this.updateImageBoxes();
// 	this.updateViews();
// 	this.orderEditableBoxes();
// 	this.trackUneditedElements = this.IDSObject.hasBaselineDoc || false;
// 	if(designStudio.mediaLibrary){
// 		designStudio.mediaLibrary.fetchMediaDataForItem(this);
// 	}
// 	designStudio.firstItemLoaded = true;
// };

// DesignStudioItem.prototype.updateIDSObject = function() {
// 	//TODO: Add undo functionality here

// 	this.preprocessingForIDSObjectUpdate();

// 	this.updateSwatchesInIDSObject();
// 	this.updateImagesInIDSObject();
// 	this.updateTextInIDSObject();

// 	if(this.hasVarnish()){
// 		this.IDSObject.displayVarnish = true;
// 	} else {
// 		this.IDSObject.displayVarnish = false;
// 	}

// 	return this;
// }

// DesignStudioItem.prototype.updateTextInIDSObject = function () {
// 	let textBoxes,
// 	idsTextBoxes;

// 	textBoxes = this.textBoxes;
// 	idsTextBoxes = this.IDSObject.textBoxes;

// 	for(let i = 0, x = textBoxes.length; i < x; i = i + 1) {
// 		if(!textBoxes[i].isLegacyDateDrivenTextBox()){
// 			idsTextBoxes[i].contentFormatted = textBoxes[i].contentFormatted;
// 			idsTextBoxes[i].modified = textBoxes[i].modified;
// 			idsTextBoxes[i].verticalAlignment = textBoxes[i].verticalAlignment;
// 			idsTextBoxes[i].fillColorR = textBoxes[i].fillColorR;
// 			idsTextBoxes[i].fillColorG = textBoxes[i].fillColorG;
// 			idsTextBoxes[i].fillColorB = textBoxes[i].fillColorB;
// 			idsTextBoxes[i].fillColorC = textBoxes[i].fillColorC;
// 			idsTextBoxes[i].fillColorM = textBoxes[i].fillColorM;
// 			idsTextBoxes[i].fillColorY = textBoxes[i].fillColorY;
// 			idsTextBoxes[i].fillColorK = textBoxes[i].fillColorK;
// 		}
// 	}
// };

// /**
//  * Keep validation, data propagation, other rule enforcement here so everything is ready for IDS update
//  */
// DesignStudioItem.prototype.preprocessingForIDSObjectUpdate = function () {
// 	/* Spread color to applicable text boxes, and also enforce foil scope*/
// 	this.propagateSwatchColorsToTextBoxes();

// 	/* Make sure the foil is held to the scope we have determined (if more restrictive than individual characters) */
// 	this.enforceFoilScope();

// 	/* After spreading foil to new pieces of text, font sizes may need to increase*/
// 	this.enforceFontMinimums();
// };

// DesignStudioItem.prototype.updateSwatchesInIDSObject = function () {
// 	const swatches = this.colorSwatches;
// 	const idsSwatches = this.IDSObject.swatches;

// 	for(let i = 0, x = swatches.length; i < x; i = i + 1) {

// 		//get IDS swatch by id, if unique ID is numeric
// 		const swatch = swatches[i];
// 		if(Number(swatch.id) > 0){
// 			let idsSwatchMatch = null;
// 			for ( let j = 0; j < idsSwatches.length && idsSwatchMatch == null; j++) {
// 				if(idsSwatches[j].id == swatch.id || idsSwatches[j].swatchName.toLowerCase() == swatch.swatchName.toLowerCase()){
// 					idsSwatchMatch = idsSwatches[j];
// 					idsSwatchMatch.redValue = swatch.red;
// 					idsSwatchMatch.greenValue = swatch.green;
// 					idsSwatchMatch.blueValue = swatch.blue;
// 					idsSwatchMatch.cyanValue = swatch.cyan;
// 					idsSwatchMatch.magentaValue = swatch.magenta;
// 					idsSwatchMatch.yellowValue = swatch.yellow;
// 					idsSwatchMatch.blackValue = swatch.black;
// 					idsSwatchMatch.modified = swatch.modified;
// 					idsSwatchMatch.colorSpace = swatch.colorSpace;
// 					idsSwatchMatch.spotValue = swatch.spotValue;
// 				}
// 			}
// 		}
// 	}
// };

// DesignStudioItem.prototype.updateImagesInIDSObject = function () {
// 	let imageBoxes,
// 		idsImageBoxes;

// 	imageBoxes = this.imageBoxes;
// 	idsImageBoxes = this.IDSObject.imageBoxes;

// 	for(let i = 0, x = imageBoxes.length; i < x; i = i + 1) {
// 		if(!_.isNull(idsImageBoxes[i]) && !_.isUndefined(idsImageBoxes[i])){
// 			idsImageBoxes[i].imageName = imageBoxes[i].imageName;
// 			idsImageBoxes[i].pageNumber = imageBoxes[i].pageNumber;
// 			idsImageBoxes[i].modified = imageBoxes[i].modified;
// 			idsImageBoxes[i].imageTop = imageBoxes[i].imageTop;
// 			idsImageBoxes[i].imageLeft = imageBoxes[i].imageLeft;
// 			idsImageBoxes[i].imageBottom = imageBoxes[i].imageBottom;
// 			idsImageBoxes[i].imageRight = imageBoxes[i].imageRight;
// 			idsImageBoxes[i].imagePixelHeight = imageBoxes[i].imageNativePixelHeight;
// 			idsImageBoxes[i].imagePixelWidth = imageBoxes[i].imageNativePixelWidth;
// 			idsImageBoxes[i].imageRotationAngle = imageBoxes[i].imageRotationAngle;
// 			idsImageBoxes[i].hidden = imageBoxes[i].hidden;
// 		}
// 	}
// };

// DesignStudioItem.prototype.loadViewsFromIDS = function() {
// 	let idsURL,
// 		viewset,
// 		viewsetLength,
// 		dsi = this;

// 	viewset = this.productDSViewSet;
// 	viewsetLength = ((viewset !== undefined && viewset !== null && viewset.length > 0)? viewset.length : 1);
// 	for (let i = 0; i < viewsetLength; i = i + 1) {
// 		//Example call: http://v1137-dids.magnetstreet.net/dsservices/apiV1/getDocumentView?sessionId=20141031-94DF4DDC640D0F991B7EA07CAB0718C8&documentId=304DF038428A6AC9738E668D1CEE2985&viewName=invr_design-studio_front&viewSize=th
// 		idsURL = designStudio.baseIDSLocation + 'getDocumentView?sessionId=' + this.sessionId + '&documentId=' + this.documentId + '&viewName=' + this.scene + '&templateId=' + this.templateStylecode;

// 		this.views[i] = new DesignStudioItemView(this.productDSViewSet[i].scene, this.productDSViewSet[i].name, idsURL, this.productDSViewSet[i].sceneCanvasWidth, this.productDSViewSet[i].sceneCanvasHeight)
// 	}
// };

// DesignStudioItem.prototype.saveToIDS = function(exportPageRange, dsCallback) {

// 	//Make sure that single pieces of text encoded as numeric codes do not get interpreted as numeric (IDS expects a string, so add an extra comma)
// 	let currentTextBoxes = null,
// 		currentTextTags = null,
// 		noUpdateTextBoxes = [];
// 	if(this.isLockedForImprintEditing && this.IDSObject.textBoxes && this.IDSObject.textBoxes.length > 0){
// 		//don't need textBoxes on update call since the template is locked for imprint editing
// 		currentTextBoxes = this.IDSObject.textBoxes;
// 		this.IDSObject.textBoxes = [];

// 		for(var i = 0; notNullOrEmpty(this.IDSObject.textTags) && i < this.IDSObject.textTags.length; i++){
// 			//Normally we wouldn't want to do this because including the text box will override the imported text tags inside the text box, but in this case there shouldn't be a collision (ASSUMES NO TAGGED TEXT TO UPDATE IN TEXT BOX WITH THIS KIND OF TABLE)
// 			if(this.IDSObject.textTags[i].name == 'tableGroupsData' && notNullOrEmpty(this.IDSObject.textTags[i].value)){
// 				for(var j = 0; j < currentTextBoxes.length; j++){
// 					if(currentTextBoxes[j].contentType == 'titledGroupsTable'){
// 						if(this.IDSObject.textTags[i].value == 'USE_SAVED_DATA') {
// 							const savedData = getTableGroupsData_visitorData();
// 							currentTextBoxes[j].contentFormatted.data = savedData.data;
// 							currentTextBoxes[j].contentFormatted.data_alpha = savedData.data_alpha;
// 							this.IDSObject.textBoxes.push(currentTextBoxes[j]);
// 						} else if(this.IDSObject.textTags[i].value == 'START_EMPTY'){
// 							currentTextBoxes[j].contentFormatted.data = [{title : '', entries : []}];
// 							currentTextBoxes[j].contentFormatted.data_alpha = [{title : '', entries : []}];
// 							this.IDSObject.textBoxes.push(currentTextBoxes[j]);
// 						}
// 					}
// 				}
// 			}
// 		}

// 	} else {

// 		currentTextTags = this.IDSObject.textTags;
// 		this.IDSObject.textTags = [];

// 		if(this.IDSObject && this.IDSObject.textBoxes){
// 			for(var i = 0; i < this.IDSObject.textBoxes.length; i++){
// 				const textBox = this.IDSObject.textBoxes[i];
// 				if(textBox && textBox.contentFormatted){
// 					for(var j = 0; j < textBox.contentFormatted.length; j++){
// 						const contentFormatted = textBox.contentFormatted[j];
// 						if(contentFormatted && contentFormatted.textStyleRanges){
// 							for(let k = 0; k < contentFormatted.textStyleRanges.length; k++){
// 								const textStyleRange = contentFormatted.textStyleRanges[k];
// 								if(textStyleRange && textStyleRange.contents){
// 									textStyleRange.contents += ',';
// 								}
// 							}
// 						}
// 					}
// 				}
// 				if(DesignStudioItemText.isLegacyDateDrivenTextBoxTagName(textBox.tagName) && !DesignStudioItemText.isDynamicDateDrivenTextBox_legacyValueCheck(textBox.contentType, this.haveExistingValidLegacyDesignRequestEventDate())){
// 					noUpdateTextBoxes.push({index: i, textBox: textBox});
// 				}
// 			}
// 			if(noUpdateTextBoxes.length > 0)
// 				currentTextBoxes = _.clone(this.IDSObject.textBoxes);

// 			for(var j = 0; j < noUpdateTextBoxes.length; j++){
// 				this.IDSObject.textBoxes.remove(noUpdateTextBoxes[j].textBox);
// 			}
// 		}
// 	}

// 	//Example of call: http://c1356.magnetstreet.net/ids/updateDocument?sessionId=20141105-D47EE5FD5B448CDDB580D69F18336305&documentId=AE3183C33B3B7FAB63C34A8194F673F5&viewList=invr_design-studio_front,invr_design-studio_inside,invr_design-studio_back&saveChanges=true

// 	this.unapproveItem();
// 	this.updateSelectedAttributes();

// 	var idsURL,
// 		exportPageRange = exportPageRange || 'ALL',
// 		saveIDSFile = this.isLockedForImprintEditing ? 'true' : 'false',
// 		productViewString = this.getProductDSViewSetString();

// 	if(this.isGuestAddress())
// 		productViewString = this.includeEnvgEditingViewOnViewList(productViewString);

// 	idsURL = designStudio.baseIDSLocation + 'updateDocument?sessionId=' + this.sessionId + '&documentId=' + this.documentId + '&viewList=' + productViewString + '&templateId=' + this.templateStylecode + '&saveChanges='+saveIDSFile+'&exportPageRange=' + exportPageRange + '&r=' + Math.random() + ':' + new Date().getTime();
// //	if (smallerThanC()) {
// //		idsURL += '&scale=' + (designStudio.scale * designStudio.scaleMultiplier);
// //	}

// 	if(this.hasFoilColor() || this.hasVarnish()){
// 		idsURL += '&exportOverprintMasks=true';
// 	}

// 	const variation = this.getSelectedVariationAttribute();
// 	if(!_.isNull(variation) && !_.isUndefined(variation)){
// 		idsURL += '&variation=' + variation.template;
// 	}

// 	let additionalSourcesJSON = designStudio.buildAdditionalSourceJSONForItem(this);

// 	if(this.isSample && this.quantity == 1 && (designStudio.dsJSON.marketId === 517 || designStudio.dsJSON.marketId === 524)){
// 		const sampleJSON = {};
// 		sampleJSON.type = 'sample';
// 		sampleJSON.sample = 'true';
// 		if(_.isNull(additionalSourcesJSON)){
// 			additionalSourcesJSON = [];
// 		}
// 		additionalSourcesJSON.push(sampleJSON);
// 	}

// 	const updateIDSData = {data: {
// 			url: idsURL,
// 			type: 'POST',
// 			data: 'docData=' + encodeURIComponent(JSON.stringify(this.IDSObject)) + (!_.isEmpty(additionalSourcesJSON) ? '&additionalSourceList=' + JSON.stringify(additionalSourcesJSON) : '' ),
// 			dataType: 'text'
// 		},
// 		context : this,
// 		callback : dsCallback,
// 		exportPageRange : exportPageRange};

// 	if(designStudio.saveToIDSQueue.length > 0 || designStudio.saveToIDSInProgress){
// 		designStudio.saveToIDSQueue.push(updateIDSData);
// 	} else {
// 		this.saveToIDS_AJAXCall(updateIDSData);
// 	}

// 	if(currentTextBoxes){
// 		//Add back after side-stepping the update call
// 		this.IDSObject.textBoxes = currentTextBoxes;
// 		//Built-in assumption is we only want to apply imprints once, so always shut it down for the item here if it hasn't already been turned off
// 		this.isLockedForImprintEditing = false;
// 	}
// 	if(currentTextTags){
// 		//Add back after side-stepping the update call
// 		this.IDSObject.textTags = currentTextTags;
// 	}
// };

// DesignStudioItem.prototype.saveToIDS_AJAXCall = function(updateIDSData) {
// 	const dsi = updateIDSData.context,
// 		dsCallback = updateIDSData.callback;
// 	designStudio.saveToIDSInProgress = true;
// 	$j.ajax(updateIDSData.data)
// 	.done(function(data) {

// 		//TODO check data to see if the response was a failure, kick off again, limit to a certain number of attempts
// 		//[{"type":"importFailed","page":0,"place":null,"description":"LIVE - uncaught exception: Cannot open the document \"\\\\v1137-dids\\dtdev-test\\external_tree_map\\40-7F\\41\\21\\412132A2D73E70A7BD838C5E222469BF\\Documents\\DAC9E46CA6DB66E7BCD55B4F8FE72CA7\\template.indd\". You may not have permission or the document may be open already."}]

// 		designStudio.saveToIDSInProgress = false;
// 		dsi.isSaved = false;
// 		if(designStudio.saveToIDSQueue.length > 0){
// 			//Kick off next update and remove it from the queue
// 			dsi.saveToIDS_AJAXCall(designStudio.saveToIDSQueue.shift());
// 		}

// 		let responseJSON = JSON.parse(data);
// 		if(typeof responseJSON === 'string'){
// 			responseJSON = JSON.parse(responseJSON);
// 		}

// 		dsi.isModified = true;

// 		if(typeof responseJSON !== 'string'){

// 			//Filter out 'null' responses in list
// 			if(notNullOrEmpty(responseJSON)){
// 				const responseNotNull = function(element){ return element !== null };
// 				responseJSON = responseJSON.filter(responseNotNull);
// 			}

// 			//Check for success
// 			for(var i = 0; i < responseJSON.length; i++){
// 				if(responseJSON[i].type){
// 					if(responseJSON[i].type === 'importFailed'){
// 						console.log('ERROR ON DOCUMENT UPDATE: ' + responseJSON[i].description);

// 						//Limited number of attempts to do the update if it failed
// 						if(dsi.updateAttempts === undefined) dsi.updateAttempts = 0;
// 						dsi.updateAttempts++;
// 						if(dsi.updateAttempts < 6){
// 							console.log('RETRY DOCUMENT UPDATE...');
// 							setTimeout(function(){ dsi.saveToIDS_AJAXCall(updateIDSData); }, 1000);
// 						}
// 						return;
// 					} else if (responseJSON[i].type === 'importSuccess'){
// 						dsi.updateAttempts = 0;
// 					}
// 				}
// 			}

// 			let overflowLogged = false;
// 			for(var i = 0; i < responseJSON.length; i++){

// 				let textBoxInErrorName = null,
// 					textBoxWithTableInErrorName = null,
// 					imageError = null;
// 				if(responseJSON[i].type){
// 					if(responseJSON[i].type === 'textBoxOverflow'){
// 						textBoxInErrorName = 'text-'+responseJSON[i].page+'-'+responseJSON[i].place;
// 						textBoxWithTableInErrorName = 'text-table-'+responseJSON[i].page+'-'+responseJSON[i].place;

// 					} else if(responseJSON[i].type === 'textPathOverflow'){
// 						textBoxInErrorName = 'textpath-'+responseJSON[i].page+'-'+responseJSON[i].place;
// 					} else if(responseJSON[i].type === 'imageObjImportError'){
// 						imageError = responseJSON[i].content;
// 					}
// 				}
// 				if(textBoxInErrorName){
// 					if(designStudio.currentDSItem.isLockedForImprintEditing){
// 						MSGA.designStudio3.textOverflowAfterImprintsApplied_textBox(designStudio.currentDSItem.productStylecode + ' : '+ textBoxInErrorName);
// 						if(!overflowLogged){
// 							MSGA.designStudio3.textOverflowAfterImprintsApplied_product(designStudio.currentDSItem.productStylecode);
// 							overflowLogged = true;
// 						}
// 					}

// 					const allTextBoxesOnItem = designStudio.currentDSItem.textBoxes;
// 					if(allTextBoxesOnItem){
// 						for(let j = 0; j < allTextBoxesOnItem.length; j++ ){
// 							const txtBox = allTextBoxesOnItem[j];
// 							if(txtBox.name === textBoxInErrorName){
// 								designStudio.showTextOutOfBoundsMessage(txtBox);
// 							}
// 							if(txtBox.name === textBoxWithTableInErrorName){
// 								//Other special handling here? Standard error message seems pretty good
// 								designStudio.showTextOutOfBoundsMessage(txtBox);
// 							}
// 						}
// 					}
// 				}

// 				if(!_.isNull(imageError)){
// 					HotTub.dialog.infoPopupWithText("There was an error uploading your file", "Error: " + imageError, true, "OK", HotTub.dialog.handleClose);
// 				}
// 			}
// 		}

// 		if(!designStudio.currentDSItem.applyingImprints && designStudio.currentDSItem.views.length < 2 && !designStudio.currentDSItem.hasFoilColor() && designStudio.currentDSItem.allowFoil() && designStudio.currentDSItem.getSuspectElementCount() <= 2){
// 			designStudio.currentDSItem.generateAnimatedUpsellImage();
// 		}

// 		(dsCallback!== undefined && dsCallback !== null)? dsCallback(dsi) : designStudio.renderItem(dsi) ;
// 	})
// 	.fail(function(data) {
// 		designStudio.saveToIDSInProgress = false;
// 		dsi.isSaved = false;

// 		if(designStudio.saveToIDSQueue.length > 0){
// 			//Kick off next update and remove it from the queue
// 			dsi.saveToIDS_AJAXCall(designStudio.saveToIDSQueue.shift());
// 		}

// 		//(dsCallback!== undefined && dsCallback !== null)? dsCallback(dsi) : designStudio.renderItem(dsi) ;
// 	});
// }

// DesignStudioItem.prototype.orderEditableBoxes = function() {
// 	let tempImageBox, tempTextBox, tempEditableBox, editableBoxes = [], position, editableBoxPosition;

// 	editableBoxes = editableBoxes.concat(this.imageBoxes);
// 	editableBoxes = editableBoxes.concat(this.textBoxes);
// 	for (var i = 0, x = this.imageBoxes.length; i < x; i = i + 1) {
// 		tempImageBox = this.imageBoxes[i];
// 		for (var j = 0, y = editableBoxes.length; j < y; j = j + 1) {
// 			tempEditableBox = editableBoxes[j];

// 			position = this.getBoxPosition(tempImageBox.name);
// 			editableBoxPosition = this.getBoxPosition(editableBoxes[j].name);

// 			if (tempImageBox.name !== editableBoxes[j].name) {
// 				if (position.top > (editableBoxPosition.top - 40) && position.bottom < (editableBoxPosition.bottom + 40)
// 						&& position.left > (editableBoxPosition.left - 40) && position.right < (editableBoxPosition.right + 40)) {
// 					this.imageBoxes[i].raisedZIndex = true;
// 				}
// 			}
// 		}
// 	}

// 	for (var i = 0, x = this.textBoxes.length; i < x; i = i + 1) {
// 		tempTextBox = this.textBoxes[i];
// 		let zIndexValue = 3;
// 		for (var j = 0, y = editableBoxes.length; j < y; j = j + 1) {
// 			tempEditableBox = editableBoxes[j];

// 			position = this.getBoxPosition(tempTextBox.name);
// 			editableBoxPosition = this.getBoxPosition(editableBoxes[j].name);

// 			if (tempTextBox.name !== editableBoxes[j].name) {
// 				if (position.top > (editableBoxPosition.top - 40) && position.bottom < (editableBoxPosition.bottom + 40)
// 						&& position.left > (editableBoxPosition.left - 40) && position.right < (editableBoxPosition.right + 40)) {
// 					this.textBoxes[i].raisedZIndex = zIndexValue;
// 					zIndexValue++;
// 				}
// 			}
// 		}
// 	}
// };

// DesignStudioItem.prototype.updateViewImages = function(viewIndex) {
// 	let idsURL,
// 	viewset,
// 	viewsetLength,
// 	dsi = this;

// 	viewIndex = viewIndex || -1;
// 	viewset = this.productDSViewSet;
// 	viewsetLength = ((viewset !== undefined && viewset !== null && viewset.length > 0)? viewset.length : 0);
// 	for (let i = 0; i < viewsetLength; i = i + 1) {
// 		//Example call: http://v1137-dids.magnetstreet.net/dsservices/apiV1/getDocumentView?sessionId=20141031-94DF4DDC640D0F991B7EA07CAB0718C8&documentId=304DF038428A6AC9738E668D1CEE2985&viewName=invr_design-studio_front&viewSize=th
// 		if (viewIndex < 0 || (viewIndex >= 0 && viewIndex === i)) {
// 			idsURL = designStudio.baseIDSLocation + 'getDocumentView?sessionId=' + this.sessionId + '&documentId=' + this.documentId + '&viewName=' + this.views[i].sceneName + '&templateId=' + this.templateStylecode;
// 			this.views[i].src = idsURL;
// 		}
// 		if (viewIndex >= 0 && viewIndex === i) {
// 			break;
// 		}

// 	}
// };

// DesignStudioItem.prototype.updateTemplateVariations = function(){
// 	this.templateVariations = [];
// 	if(!_.isNull(this.IDSObject.templateVariations) && !_.isUndefined(this.IDSObject.templateVariations)){
// 		for (let i = 0, x = this.IDSObject.templateVariations.length; i < x; i = i + 1) {
// 			this.templateVariations.push(this.IDSObject.templateVariations[i]);
// 		}
// 	}
// };

// DesignStudioItem.prototype.updateColorSwatches = function() {
// 	let tempColorSwatch;
// 	//Design Color Swatches
// 	this.colorSwatches = [];
// 	for (var i = 0, x = this.IDSObject.swatches.length; i < x; i = i + 1) {
// 		tempColorSwatch = this.IDSObject.swatches[i];
// 		this.colorSwatches[i] = new DesignStudioItemColorSwatch(this.productId, tempColorSwatch.id, tempColorSwatch.place, tempColorSwatch.swatchName, tempColorSwatch.colorSpace, Math.round(tempColorSwatch.redValue), Math.round(tempColorSwatch.greenValue), Math.round(tempColorSwatch.blueValue), Math.round(tempColorSwatch.cyanValue), Math.round(tempColorSwatch.magentaValue), Math.round(tempColorSwatch.yellowValue), Math.round(tempColorSwatch.blackValue), tempColorSwatch.modified, tempColorSwatch.spotValue, tempColorSwatch.foilable);
// 	}
// 	//Text Swatches: keep track of each color we add to avoid duplicates, we will be consolidating the colors we find on each same style bit of text
// 	const addeds = [];
// 	const swatchInList = function(colorsAdded, colorKey, fillColorSpace/*, foilable*/){
// 		let foundInList = false;
// 		if(colorKey !== undefined && fillColorSpace !== undefined/* && foilable !== undefined*/ && colorsAdded && colorsAdded.length > 0){
// 			for(let index = 0; index < colorsAdded.length; index++){
// 				const swatchData = colorsAdded[index];
// 				if(swatchData.colorKey == colorKey && swatchData.fillColorSpace == fillColorSpace/* && swatchData.foilable == foilable*/){
// 					foundInList = true;
// 					break;
// 				}
// 			}
// 		}
// 		return foundInList;
// 	}
// 	for ( var i = 0; i < this.IDSObject.textBoxes.length; i++) {
// 		const textBox = this.IDSObject.textBoxes[i];
// 		if(!textBox.lockColor && !DesignStudioItemText.isLegacyDateDrivenTextBoxTagName(textBox.tagName) && !DesignStudioItemText.isDynamicDateDrivenTextBox_legacyValueCheck(textBox.contentType, this.haveExistingValidLegacyDesignRequestEventDate())){

// 			const textColorTargetList = [];

// 			if(textBox.contentType === 'titledGroupsTable' && textBox.contentFormatted){

// 				const getPreviewText = function(styleObj){
// 						let previewText = '';
// 						const _data = _style.data[_i];
// 						if(notNullOrEmpty(styleObj.title))
// 							previewText += styleObj.title + ': ';
// 						if(notNullOrEmpty(styleObj.entries))
// 							previewText += styleObj.entries.join(', ');
// 						return previewText;
// 					},
// 					dataToUse = (textBox.contentFormatted.type === 'alpha' ? textBox.contentFormatted.data_alpha : textBox.contentFormatted.data);

// 				if(textBox.contentFormatted.titleStyle){
// 					var textColorTarget = {},
// 						_style = textBox.contentFormatted.titleStyle,
// 						colorKey =  Math.round(_style.fillColorC)+'-'+Math.round(_style.fillColorM)+'-'+Math.round(_style.fillColorY)+'-'+Math.round(_style.fillColorK)+'-'+_style.fillColorSpace + (textBox.foilable ? '-foilable' : '-standard'),
// 						editableTextPreview = (notNullOrEmpty(dataToUse) ? dataToUse[0].title: ''),
// 						hasText = notNullOrEmpty(editableTextPreview);

// 					textColorTarget.props = _style;
// 					textColorTarget.colorKey = colorKey;
// 					textColorTarget.hasText = hasText;
// 					textColorTarget.editableTextPreview = editableTextPreview;
// 					textColorTargetList.push(textColorTarget);
// 				}
// 				if(textBox.contentFormatted.nameStyle){

// 					var textColorTarget = {},
// 						_style = textBox.contentFormatted.nameStyle,
// 						colorKey =  Math.round(_style.fillColorC)+'-'+Math.round(_style.fillColorM)+'-'+Math.round(_style.fillColorY)+'-'+Math.round(_style.fillColorK)+'-'+_style.fillColorSpace + (textBox.foilable ? '-foilable' : '-standard'),
// 						editableTextPreview = (notNullOrEmpty(dataToUse) ? dataToUse[0].entries.join(', ') : ''),
// 						hasText = notNullOrEmpty(editableTextPreview);

// 					textColorTarget.props = _style;
// 					textColorTarget.colorKey = colorKey;
// 					textColorTarget.hasText = hasText;
// 					textColorTarget.editableTextPreview = editableTextPreview;
// 					textColorTarget.modified = textBox.modified;
// 					textColorTargetList.push(textColorTarget);
// 				}
// 			} else {
// 				for ( let j = 0; j < textBox.contentFormatted.length; j++) {
// 					const contentFormatted = textBox.contentFormatted[j];
// 					for ( var k = 0; k < contentFormatted.textStyleRanges.length; k++) {
// 						var textColorTarget = {},
// 							tsr = contentFormatted.textStyleRanges[k],
// 							colorKey =  Math.round(tsr.fillColorC)+'-'+Math.round(tsr.fillColorM)+'-'+Math.round(tsr.fillColorY)+'-'+Math.round(tsr.fillColorK)+'-'+tsr.fillColorSpace + (textBox.foilable ? '-foilable' : '-standard'),
// 							hasText = ((tsr.contents+'').replace(/(13)/g,'').replace(/,/g,'').trim().length > 0);

// 						const charArray = (tsr.contents + '').split(',');
// 						var editableTextPreview = String.fromCharCode.apply(null, charArray).trim();

// 						textColorTarget.props = tsr;
// 						textColorTarget.colorKey = colorKey;
// 						textColorTarget.hasText = hasText;
// 						textColorTarget.editableTextPreview = editableTextPreview;
// 						textColorTargetList.push(textColorTarget);
// 					}
// 				}
// 			}

// 			for(let l = 0; l < textColorTargetList.length; l++){
// 				var textColorTarget = textColorTargetList[l],
// 					previewLimit = 35,
// 					textPreview = (textColorTarget.editableTextPreview.length > previewLimit) ? textColorTarget.editableTextPreview.substring(0,previewLimit) : textColorTarget.editableTextPreview;
// 				if(hasHTMLCharsNeedingReplacement(textPreview))
// 					textPreview = htmlCharReplace(textPreview);

// 				const overprintModifier = (textBox.foilable ? '_overprintAvailable' : '_noOverprint');
// 				if(textColorTarget.hasText && addeds.indexOf(textColorTarget.colorKey + overprintModifier) > -1){
// 					//update name on matching color swatch
// 					const moreTextPlaceholder = '... etc.';
// 					for(var k = 0; k < this.colorSwatches.length; k++){
// 						const cs = this.colorSwatches[k];
// 						if((''+cs.id).indexOf(textColorTarget.colorKey) > -1 && cs.swatchName.split('<span').length - 1 < 2){
// 							cs.swatchName += '<span class="textBlockDisplayName secondThirdLine">'+textPreview + '</span>';
// 						} else if (cs.swatchName.indexOf('secondThirdLine') > 0 && cs.swatchName.split(moreTextPlaceholder).length < 2) {
// 							cs.swatchName += '<span class="textBlockDisplayName secondThirdLine">'+moreTextPlaceholder+'</span>';
// 						}
// 					}
// 				} else if(textColorTarget.hasText){
// 					//Haven't seen this color yet, add it
// 					const name = '<span class="textBlockDisplayName">'+textPreview+'</span>';
// 					this.colorSwatches.push(new DesignStudioItemColorSwatch(this.productId, 'textColor'+textColorTarget.colorKey, textBox.place, name, textColorTarget.props.fillColorSpace, Math.round(textColorTarget.props.fillColorR), Math.round(textColorTarget.props.fillColorG), Math.round(textColorTarget.props.fillColorB), Math.round(textColorTarget.props.fillColorC), Math.round(textColorTarget.props.fillColorM), Math.round(textColorTarget.props.fillColorY), Math.round(textColorTarget.props.fillColorK), textBox.modified, textColorTarget.props.fillSpotValue, textBox.foilable));
// 					addeds.push(textColorTarget.colorKey + overprintModifier);
// 				}
// 			}
// 		}
// 	}
// };

// DesignStudioItem.prototype.updateTextBoxes = function() {
// 	let tempTextBox,
// 		tempFormattedContent,
// 		tempTextStyleRange;

// 	for (var i = 0, x = this.IDSObject.textBoxes.length; i < x; i = i + 1) {
// 		tempTextBox = this.IDSObject.textBoxes[i];

// 		if (tempTextBox.contentFormatted !== undefined && tempTextBox.contentFormatted !== null && tempTextBox.contentFormatted !== '' && tempTextBox.contentFormatted.length > 0) {
// 			for (var j = 0, y = tempTextBox.contentFormatted.length; j < y; j = j + 1) {
// 				tempFormattedContent = tempTextBox.contentFormatted[j];
// 				if (tempFormattedContent.textStyleRanges !== undefined && tempFormattedContent.textStyleRanges !== null && tempFormattedContent.textStyleRanges !== '' && tempFormattedContent.textStyleRanges.length > 0) {
// 					for (let k = 0, z = tempFormattedContent.textStyleRanges.length; k < z; k = k + 1) {
// 						tempTextStyleRange = tempFormattedContent.textStyleRanges[k];
// 						tempTextStyleRange.pointSize = Math.round(tempTextStyleRange.pointSize * 100)/100;
// 						tempFormattedContent.textStyleRanges[k] = new DesignStudioItemTextStyleRange(tempTextStyleRange.contents, tempTextStyleRange.pointSize, tempTextStyleRange.font, tempTextStyleRange.leading, tempTextStyleRange.tracking, tempTextStyleRange.capitalization, tempTextStyleRange.otf, tempTextStyleRange.baselineShift, tempTextStyleRange.fillColorSpace,
// 								tempTextStyleRange.fillColorR, tempTextStyleRange.fillColorG, tempTextStyleRange.fillColorB, tempTextStyleRange.fillColorC, tempTextStyleRange.fillColorM, tempTextStyleRange.fillColorY, tempTextStyleRange.fillColorK, tempTextStyleRange.fillSpotValue);
// 					}
// 				}
// 				tempTextBox.contentFormatted[j] = new DesignStudioItemFormattedContent(tempFormattedContent.justification, tempFormattedContent.textStyleRanges);
// 			}
// 		}

// 		const existingErrors = this.itemErrors;
// 		let textItemErrors = undefined;
// 		if(existingErrors && existingErrors.length > 0){
// 			for(var j = 0; j < existingErrors.length; j++){
// 				const errorTypeCode = existingErrors[j][tempTextBox.name];
// 				if(errorTypeCode && !isHiddenFromUserErrorCode(errorTypeCode)){
// 					if(!textItemErrors) textItemErrors = [];
// 					textItemErrors.push(errorTypeCode);
// 				}
// 			}
// 		}
// 		const displayNameOverride = tempTextBox.monthName || null;
// 		this.textBoxes[i] = new DesignStudioItemText(this, tempTextBox.id, tempTextBox.name, tempTextBox.tagName, tempTextBox.page, tempTextBox.place, tempTextBox.rotationAngle, tempTextBox.verticalAlignment, tempTextBox.top, tempTextBox.left, tempTextBox.bottom, tempTextBox.right,
// 				tempTextBox.modified, tempTextBox.lockColor, tempTextBox.lockFontFace, tempTextBox.lockFontSize, tempTextBox.minFontSize, tempTextBox.lockFontAlignment, tempTextBox.lockVerticalAlignment, tempTextBox.lockLeading, tempTextBox.lockEditing, tempTextBox.contentFormatted, tempTextBox.contentType, tempTextBox.foilable, tempTextBox.fillColorR, tempTextBox.fillColorG, tempTextBox.fillColorB, tempTextBox.fillColorC, tempTextBox.fillColorM, tempTextBox.fillColorY, tempTextBox.fillColorK, displayNameOverride, i, textItemErrors);

// 		//set modified attribute if text box contains imprint text
// 		if(designStudio.dsTextImprints && designStudio.dsTextImprints.textImprintsForm && !this.isLockedForImprintEditing){//always do this? or just when locked?

// 			var textPreview = this.textBoxes[i].getFlattenedPlainTextContents();
// 			if(isNullOrEmpty(textPreview) || textPreview.indexOf('(empty line') > -1){
// 				this.textBoxes[i].modified = true;
// 			} else {
// 				const formData = designStudio.dsTextImprints.textImprintsForm.formData;
// 				if(formData){
// 					var currentDSItem = this;
// 					$j.each( formData, function( index, formItemData ) {
// 						if(notNullOrEmpty(formItemData.value) && (textPreview.indexOf(formItemData.value.substring(0,10)) > -1 || textPreview.indexOf('(text empty)') > -1)){
// 							currentDSItem.textBoxes[i].modified = true;
// 						}
// 					});
// 				}
// 			}
// 		}
// 	}
// };

// DesignStudioItem.prototype.updateImageBoxes = function() {
// 	let tempImageBox;

// 	for (let i = 0, x = this.IDSObject.imageBoxes.length; i < x; i = i + 1) {
// 		tempImageBox = this.IDSObject.imageBoxes[i];

// 		const existingErrors = this.itemErrors;
// 		let imageItemErrors = undefined;
// 		if(existingErrors && existingErrors.length > 0){
// 			for(let j = 0; j < existingErrors.length; j++){
// 				const errorTypeCode = existingErrors[j][tempImageBox.name];
// 				if(errorTypeCode && !isHiddenFromUserErrorCode(errorTypeCode)){
// 					if(!imageItemErrors) imageItemErrors = [];
// 					imageItemErrors.push(errorTypeCode);
// 				}
// 			}
// 		}

// 		this.imageBoxes[i] = new DesignStudioItemImage(this, tempImageBox.name, tempImageBox.page, tempImageBox.place, tempImageBox.tagName, tempImageBox.type, tempImageBox.contentType, tempImageBox.hzAlign, tempImageBox.vtAlign, tempImageBox.rotationAngle, tempImageBox.top, tempImageBox.left, tempImageBox.bottom, tempImageBox.right, tempImageBox.imageRotationAngle, tempImageBox.imageTop, tempImageBox.imageLeft, tempImageBox.imageBottom, tempImageBox.imageRight,
// 				tempImageBox.defaultImageTop, tempImageBox.defaultImageLeft, tempImageBox.defaultImageBottom, tempImageBox.defaultImageRight, tempImageBox.modified, tempImageBox.imagePixelWidth, tempImageBox.imagePixelHeight, tempImageBox.imageName, tempImageBox.pageNumber,
// 				tempImageBox.contrast, tempImageBox.brightness, tempImageBox.saturation, tempImageBox.hidden, imageItemErrors);

// 		if(this.imageBoxes[i].hasSuspiciousRotationAngle()){
// 			MSGA.designStudio3.logSuspiciousRotationAngle(this.productStylecode);
// 		}
// 	}
// };

// DesignStudioItem.prototype.updateViews = function() {
// 	if(this.isMultidocument){
// 		this.updateMultidocumentViews();
// 	} else {
// 		let tempView, tempViewData, tempViewBounds, viewIndex = 0;
// 		for (var i = 0, x = this.IDSObject.views.length; i < x; i = i + 1) {
// 			tempView = this.IDSObject.views[i];
// 			if(this.typeCode != 'RPA' || (tempView.sceneName.indexOf('_back') < 0 || (this.typeCode == 'RPA' && ((tempView.sceneName.indexOf('_alt') < 0 && !this.hasBacksideElement()) || (tempView.sceneName.indexOf('_alt') > -1 && this.hasBacksideElement()))))){
// 				if (tempView.viewData !== undefined && tempView.viewData !== null && tempView.viewData !== '' && tempView.viewData.length > 0) {
// 					for (let j = 0, y = tempView.viewData.length; j < y; j = j + 1) {
// 						tempViewData = tempView.viewData[j];
// 						if (tempViewData.viewBounds !== undefined && tempViewData.viewBounds !== null && tempViewData.viewBounds !== '' && tempViewData.viewBounds.length > 0) {
// 							for (let k = 0, z = tempViewData.viewBounds.length; k < z; k = k + 1) {
// 								tempViewBounds = tempViewData.viewBounds[k];
// 								tempViewData.viewBounds[k] = new DesignStudioItemViewBounds(tempViewBounds.x, tempViewBounds.y);
// 							}
// 						}
// 						if (tempViewData.unclippedViewBounds !== undefined && tempViewData.unclippedViewBounds !== null && tempViewData.unclippedViewBounds !== '' && tempViewData.unclippedViewBounds.length > 0) {
// 							for (let m = 0, v = tempViewData.unclippedViewBounds.length; m < v; m = m + 1) {
// 								tempUnclippedViewBounds = tempViewData.unclippedViewBounds[m];
// 								tempViewData.unclippedViewBounds[m] = new DesignStudioItemViewBounds(tempUnclippedViewBounds.x, tempUnclippedViewBounds.y);
// 							}
// 						}
// 						tempViewData.centerPoint = new DesignStudioItemViewBounds(tempViewData.centerPoint.x, tempViewData.centerPoint.y);
// 						tempViewData.documentCenterPoint = new DesignStudioItemViewBounds(tempViewData.documentCenterPoint.x, tempViewData.documentCenterPoint.y);
// 						tempView.viewData[j] = new DesignStudioItemViewData(tempViewData.name, tempViewData.page, tempViewData.place, tempViewData.viewBounds, tempViewData.centerPoint, tempViewData.documentCenterPoint, tempViewData.perspectiveTransformRotationAngle, tempViewData.unclippedViewBounds);
// 					}
// 				}
// 				//Example call: http://v1137-dids.magnetstreet.net/dsservices/apiV1/getDocumentView?sessionId=20141031-94DF4DDC640D0F991B7EA07CAB0718C8&documentId=304DF038428A6AC9738E668D1CEE2985&viewName=invr_design-studio_front&viewSize=th
// 				idsURL = designStudio.baseIDSLocation + 'getDocumentView?sessionId=' + this.sessionId + '&documentId=' + this.documentId + '&viewName=' + tempView.sceneName + '&templateId=' + this.templateStylecode;
// 				this.views[viewIndex] = new DesignStudioItemView(tempView.sceneName, tempView.viewData, tempView.name, idsURL, tempView.sceneCanvasWidth, tempView.sceneCanvasHeight);
// 				viewIndex++;
// 			}
// 		}

// 		if(_.isEmpty(this.proofingViews)) {
// 			for (var i = 0, x = this.productViewSet.length; i < x; i = i + 1) {
// 				tempView = this.productViewSet[i];
// 				if(tempView.isProofing){
// 					idsURL = designStudio.baseIDSLocation + 'getDocumentView?sessionId=' + this.sessionId + '&documentId=' + this.documentId + '&viewName=' + tempView.scene + '&templateId=' + this.templateStylecode + '&viewCache=dsOnly';
// 					this.proofingViews.push(new DesignStudioItemView(tempView.scene, null, null, idsURL, tempView.sceneCanvasWidth, tempView.sceneCanvasHeight, true));
// 				}
// 			}
// 		}

// 		if (!this.isMultidocument && this.productStylecode.indexOf('ENV') > -1) {
// 			this.hideIncorrectEnvelopeSubstrateViews();
// 		} else if(designStudio.envelopeProductTypes.indexOf(this.typeCode) > -1 ){
// 			this.hideIncorrectEnvelopeSubstrateProofingViews();
// 		}
// 	}
// };

// //DesignStudioItem.prototype.delayed_multidocViewRenderParams = null;
// DesignStudioItem.prototype.renderAndUpdateMultidocumentViews = function(dsCallback) {
// 	dsi = this;
// //	if (smallerThanC()) {
// //		idsURL += '&scale=' + (designStudio.scale * designStudio.scaleMultiplier);
// //	}

// //	dsi.delayed_multidocViewRenderParams = null;
// 	if(!designStudio.additionalSourceItemsForJSONReady(dsi)){
// 		//We will just ignore premature calls to render, because another call will be initiated by the items we are waiting on

// 		//ALTERNATIVE APPROACH - UNCOMMENT TO IMPLEMENT - results in duplicate calls during testing, forces these calls to wait until all items ready
// 		//		//Delayed call to this same function after x seconds delay to see if items are all ready...
// 		//		dsi.delayed_multidocViewRenderParams = [dsCallback];
// 		//		setTimeout(function(){
// 		//			if(dsi.delayed_multidocViewRenderParams){
// 		//				dsi.renderAndUpdateMultidocumentViews(dsi.delayed_multidocViewRenderParams[0]);
// 		//			}
// 		//		}, 1000);
// 		//		console.log('Waiting a second for envelope-related items to be ready...')

// 		return;
// 	}

// 	const productViews = this.productDSViewSet.concat(this.productViewSet), viewNames = [];
// 	for (let i = 0, x = productViews.length; i < x; i = i + 1) {
// 		const tempView = productViews[i];
// 		if(viewNames.indexOf(tempView.scene) < 0){
// 			viewNames.push(tempView.scene);
// 			//Example call: http://v1137-dids.magnetstreet.net/dsservices/apiV1/getDocumentView?sessionId=20141031-94DF4DDC640D0F991B7EA07CAB0718C8&documentId=304DF038428A6AC9738E668D1CEE2985&viewName=invr_design-studio_front&viewSize=th
// 			idsURL = designStudio.baseIDSLocation + 'renderMultiDocumentView?sessionId=' + this.sessionId + '&mdViewId=' + this.documentId + '&viewName=' + tempView.scene;

// 			const additionalSourcesJSON = designStudio.buildAdditionalSourceJSONForItem(this);

// 			if(this.isSample && this.quantity == 1 && (designStudio.dsJSON.marketId === 517 || designStudio.dsJSON.marketId === 524)){
// 				const sampleJSON = {};
// 				sampleJSON.type = 'sample';
// 				sampleJSON.sample = 'true';
// 				if(_.isNull(additionalSourcesJSON)){
// 					sourcesJSON = {};
// 				}
// 				sourcesJSON.push(sampleJSON);
// 			}

// 			multidocumentQueue.push(i);
// 			$j.ajax({
// 				url: idsURL,
// 				type: 'POST',
// 				data: (!_.isEmpty(additionalSourcesJSON) ? 'sourceList=' + JSON.stringify(additionalSourcesJSON) : '' ),
// 				dataType: 'text'
// 			})
// 			.done(function(data) {
// //				showWorkingStatusOfItems('RENDER MULTI-DOC VIEWS 2');
// 				dsi.updateMultidocumentViews();
// 				multidocumentQueue.pop();
// 				if(multidocumentQueue.length == 0){
// 					(dsCallback!== undefined && dsCallback !== null)? dsCallback(dsi) : designStudio.renderItem(dsi);
// 				}
// 			})
// 			.fail(function(data){
// 				if(multidocumentRenderCount < 5){
// 					multidocumentQueue.pop();
// 					dsi.getSingleDocumentId(dsi.getViewDimensionsFromIDS(dsCallback));
// 					multidocumentRenderCount++;
// 				} else {
// 					console.log('too many tries for rendering');
// 				}
// 			});
// 		}
// 	}
// };

// DesignStudioItem.prototype.renderMultidocumentViews = function(dsCallback) {
// 	dsi = this;
// //	if (smallerThanC()) {
// //		idsURL += '&scale=' + (designStudio.scale * designStudio.scaleMultiplier);
// //	}

// 	const multidocumentQueue = [], viewNames = [];
// 	const productViews = this.productDSViewSet.concat(this.productViewSet);
// 	for (let i = 0, x = productViews.length; i < x; i = i + 1) {
// 		const tempView = productViews[i];
// 		if(viewNames.indexOf(tempView.scene) < 0){
// 			viewNames.push(tempView.scene);
// 			multidocumentQueue.push(i);
// 			//Example call: http://v1137-dids.magnetstreet.net/dsservices/apiV1/getDocumentView?sessionId=20141031-94DF4DDC640D0F991B7EA07CAB0718C8&documentId=304DF038428A6AC9738E668D1CEE2985&viewName=invr_design-studio_front&viewSize=th
// 			idsURL = designStudio.baseIDSLocation + 'renderMultiDocumentView?sessionId=' + this.sessionId + '&mdViewId=' + this.documentId + '&viewName=' + tempView.scene;

// 			const additionalSourcesJSON = designStudio.buildAdditionalSourceJSONForItem(this);

// 			$j.ajax({
// 				url: idsURL,
// 				type: 'POST',
// 				data: (!_.isEmpty(additionalSourcesJSON) ? 'sourceList=' + JSON.stringify(additionalSourcesJSON) : '' ),
// 				dataType: 'text'
// 			})
// 			.done(function(data) {
// //				showWorkingStatusOfItems('RENDER MULTI-DOC VIEWS');
// 				dsi.updateMultidocumentViews();
// 				multidocumentQueue.pop();
// 				if(multidocumentQueue.length == 0){
// 					(dsCallback!== undefined && dsCallback !== null)? dsCallback(dsi) : '';
// 				}
// 			});
// 		}
// 	}
// };

// const showWorkingStatusOfItems = function(caller){
// 	console.log('\n\n'+caller);
// 	for(let i = 0; i < designStudio.dsItems.length; i++){
// 		const _dsi = designStudio.dsItems[i];
// 		console.log('\tItem '+_dsi.productStylecode + ' working? -> ' + (_dsi.isWorking ? 'YES' : 'no'));
// 	}
// };

// DesignStudioItem.prototype.updateMultidocumentViews = function() {
// 	var tempView, tempViewData, tempViewBounds;
// 	for (var i = 0, x = this.productDSViewSet.length; i < x; i = i + 1) {
// 		tempView = this.productDSViewSet[i];

// 		var tempViewData, tempViewBounds;
// 		if (tempView.viewData !== undefined && tempView.viewData !== null && tempView.viewData !== '' && tempView.viewData.length > 0) {
// 			for (let j = 0, y = tempView.viewData.length; j < y; j = j + 1) {
// 				tempViewData = tempView.viewData[j];
// 				if (tempViewData.viewBounds !== undefined && tempViewData.viewBounds !== null && tempViewData.viewBounds !== '' && tempViewData.viewBounds.length > 0) {
// 					for (let k = 0, z = tempViewData.viewBounds.length; k < z; k = k + 1) {
// 						tempViewBounds = tempViewData.viewBounds[k];
// 						tempViewData.viewBounds[k] = new DesignStudioItemViewBounds(tempViewBounds.x, tempViewBounds.y);
// 					}
// 				}
// 				if (tempViewData.unclippedViewBounds !== undefined && tempViewData.unclippedViewBounds !== null && tempViewData.unclippedViewBounds !== '' && tempViewData.unclippedViewBounds.length > 0) {
// 					for (let m = 0, v = tempViewData.unclippedViewBounds.length; m < v; m = m + 1) {
// 						tempUnclippedViewBounds = tempViewData.unclippedViewBounds[m];
// 						tempViewData.unclippedViewBounds[m] = new DesignStudioItemViewBounds(tempUnclippedViewBounds.x, tempUnclippedViewBounds.y);
// 					}
// 				}
// 				tempViewData.centerPoint = new DesignStudioItemViewBounds(tempViewData.centerPoint.x, tempViewData.centerPoint.y);
// 				tempViewData.documentCenterPoint = new DesignStudioItemViewBounds(tempViewData.documentCenterPoint.x, tempViewData.documentCenterPoint.y);
// 				tempView.viewData[j] = new DesignStudioItemViewData(tempViewData.name, tempViewData.page, tempViewData.place, tempViewData.viewBounds, tempViewData.centerPoint, tempViewData.documentCenterPoint, tempViewData.perspectiveTransformRotationAngle, tempViewData.unclippedViewBounds);
// 			}
// 		}

// 		//Example call: http://v1137-dids.magnetstreet.net/dsservices/apiV1/getDocumentView?sessionId=20141031-94DF4DDC640D0F991B7EA07CAB0718C8&documentId=304DF038428A6AC9738E668D1CEE2985&viewName=invr_design-studio_front&viewSize=th
// 		idsURL = designStudio.baseIDSLocation + 'getMultiDocumentView?sessionId=' + this.sessionId + '&mdViewId=' + this.documentId + '&viewName=' + tempView.scene;
// 		this.views[i] = new DesignStudioItemView(tempView.scene, tempView.data, tempView.name, idsURL, tempView.sceneCanvasWidth, tempView.sceneCanvasHeight);
// 	}

// 	if(_.isEmpty(this.proofingViews)) {
// 		for (var i = 0, x = this.productViewSet.length; i < x; i = i + 1) {
// 			tempView = this.productViewSet[i];
// 			if(tempView.isProofing){
// 				idsURL = designStudio.baseIDSLocation + 'getMultiDocumentView?sessionId=' + this.sessionId + '&mdViewId=' + this.documentId + '&viewName=' + tempView.scene + '&viewCache=dsOnly';
// 				this.proofingViews.push(new DesignStudioItemView(tempView.scene, null, tempView.name, idsURL, tempView.sceneCanvasWidth, tempView.sceneCanvasHeight));
// 			}
// 		}
// 	}

// 	if (!this.isMultidocument && this.productStylecode.indexOf('ENV') > -1) {
// 		this.hideIncorrectEnvelopeSubstrateViews();
// 	} else if(designStudio.envelopeProductTypes.indexOf(this.typeCode) > -1 ){
// 		this.hideIncorrectEnvelopeSubstrateProofingViews();
// 	}
// };

// DesignStudioItem.prototype.recalcProofingViews = function() {
// 	this.proofingViews = [];
// 	for (let i = 0, x = this.productViewSet.length; i < x; i = i + 1) {
// 		tempView = this.productViewSet[i];
// 		if(tempView.isProofing){
// 			idsURL = designStudio.baseIDSLocation + 'getDocumentView?sessionId=' + this.sessionId + '&documentId=' + this.documentId + '&viewName=' + tempView.scene + '&templateId=' + this.templateStylecode + '&viewCache=dsOnly';
// 			this.proofingViews.push(new DesignStudioItemView(tempView.scene, null, tempView.name, idsURL, tempView.sceneCanvasWidth, tempView.sceneCanvasHeight));
// 		}
// 	}
// }

// DesignStudioItem.prototype.updateStockViews = function() {
// 	/*if(!_.isNull(this.selectedAttributes) && !_.isUndefined(this.selectedAttributes)){
// 		for(var i = 0, x = this.selectedAttributes.length; i < x; i = i + 1){
// 			this.previewImageURL = this.previewImageURL.replace('_white', '').replace('_kraft', '').replace('_pearl', '');
// 			if(this.selectedAttributes[i].webDescription.toUpperCase().indexOf('WHITE') >= 0){
// 				this.previewImageURL = this.previewImageURL.replace('?', '_white?');
// 			} else if(this.selectedAttributes[i].webDescription.toUpperCase().indexOf('KRAFT') >= 0){
// 				this.previewImageURL = this.previewImageURL.replace('?', '_kraft?');
// 			} else if(this.selectedAttributes[i].webDescription.toUpperCase().indexOf('PEARL') >= 0){
// 				this.previewImageURL = this.previewImageURL.replace('?', '_pearl?');
// 			}
// 			break;
// 		}
// 	}
// 	*/
// 	if(!_.isNull(this.productDSViewSet) && !_.isUndefined(this.productDSViewSet) && this.productDSViewSet.length > 0){
// 		viewset = this.productDSViewSet;
// 		viewsetLength = ((viewset !== undefined && viewset !== null && viewset.length > 0)? viewset.length : 1);
// 		this.views[0] = new DesignStudioItemView(this.productDSViewSet[0].scene, null, this.productDSViewSet[0].name, this.previewImageURL)
// 	} else {
// 		this.views[0] = new DesignStudioItemView(this.productName, null, null, this.previewImageURL);
// 	}
// };

// DesignStudioItem.prototype.enforceFontMinimums = function (spotColorValue) {
// 	const textBoxes = this.textBoxes;
// 	if(textBoxes && textBoxes.length > 0){
// 		//Make sure any text is above the minimum, or if foil is present, above any minimum foil font size
// 		for(let tbi = 0; tbi < textBoxes.length; tbi++){
// 			var textBox = textBoxes[tbi];
// 			if(notNullOrEmpty(textBox.contentFormatted) && $j.isArray(textBox.contentFormatted) && designStudio.richTextEditor.fontList.fonts && textBox.lockFontSize !== true && textBox.tagName !== 'legend'){
// 				$j.each(textBox.contentFormatted, function(cf_index, cf){
// 					if(notNullOrEmpty(cf.textStyleRanges)){
// 						$j.each(cf.textStyleRanges, function(tsr_index, tsr){
// 							//Find font
// 							let fontMatch = null;
// 							for(let j = 0; j < designStudio.richTextEditor.fontList.fonts.length && fontMatch === null; j++){
// 								const font = designStudio.richTextEditor.fontList.fonts[j];
// 								if(font.faceName == tsr.font){
// 									fontMatch = font;
// 								}
// 							}
// 							//Find applicable minimum
// 							let minFontSize = textBox.minFontSize;
// 							const hasFoil = (tsr.fillColorSpace == 'SPOT' && tsr.fillSpotValue);
// 							if((!minFontSize || hasFoil) && fontMatch){
// 								minFontSize = fontMatch.minPointSize;
// 								if(hasFoil && fontMatch.minFoilPointSize){
// 									minFontSize = fontMatch.minFoilPointSize;
// 								}
// 								if(hasFoil && (tsr.baselineShift == 'superscript' || tsr.baselineShift == 'subscript')){
// 									//remove sub and super script here if foil present
// 									tsr.baselineShift = 'baseline';
// 								}
// 							}
// 							//Enforce minimum
// 							if(tsr.pointSize < minFontSize){
// 								tsr.pointSize = minFontSize;
// 								//Not getting applied to IDS changes, just client-side data
// 							}
// 						});
// 					}
// 				});
// 			}
// 		}
// 	}
// };

// DesignStudioItem.prototype.propagateSwatchColorsToTextBoxes = function(){
// 	const swatches = this.colorSwatches;
// 	const idsSwatches = this.IDSObject.swatches;

// 	for(let i = 0, x = swatches.length; i < x; i = i + 1) {
// 		//get IDS swatch by id, if unique ID is numeric
// 		const swatch = swatches[i];
// 		if(Number(swatch.id) > 0){
// 			//nothing to do for non-text swatches

// 		} else if(swatch.id.indexOf('textColor') > -1){
// 			//update all colors that have the CMYK values embedded in ID with the new values
// 			const oldCMYK = swatch.id.replace('textColor','').split('-');
// 			for ( let l = 0; l < this.textBoxes.length; l++) {
// 				const textBox = this.textBoxes[l];
// 				if(textBox.contentType == 'month' || textBox.contentType == 'highlightDate') break;
// 				if(!textBox.lockedColor && convertToBoolean(textBox.foilable) == convertToBoolean(swatch.foilable)){

// 					if(textBox.contentType == 'titledGroupsTable'){
// 						const stylesToProcess = [];
// 						if(textBox.contentFormatted.titleStyle)
// 							stylesToProcess.push(textBox.contentFormatted.titleStyle);
// 						if(textBox.contentFormatted.nameStyle)
// 							stylesToProcess.push(textBox.contentFormatted.nameStyle);

// 						for(let _si = 0; _si < stylesToProcess.length; _si++){
// 							const _style =stylesToProcess[_si];
// 							if((Number(oldCMYK[0]) == Math.round(_style.fillColorC) &&
// 									Number(oldCMYK[1]) == Math.round(_style.fillColorM) &&
// 									Number(oldCMYK[2]) == Math.round(_style.fillColorY) &&
// 									Number(oldCMYK[3]) == Math.round(_style.fillColorK)) &&
// 									oldCMYK[4] == _style.fillColorSpace){

// 								//Match found
// 								_style.fillColorR = swatch.red;
// 								_style.fillColorG = swatch.green;
// 								_style.fillColorB = swatch.blue;
// 								_style.fillColorC = swatch.cyan;
// 								_style.fillColorM = swatch.magenta;
// 								_style.fillColorY = swatch.yellow;
// 								_style.fillColorK = swatch.black;
// 								_style.modified = swatch.modified;
// 								_style.fillColorSpace = swatch.colorSpace;
// 								_style.fillSpotValue = swatch.spotValue;

// 								if(swatch.modified){
// 									textBox.modified = true;
// 									/* Update the client-side text box so that it knows it has been modified
// 									 and doesn't accidentally overwrite the IDS modified flag later on */
// 									this.textBoxes[l].modified = true;
// 								}
// 							}
// 						}

// 					} else {
// 						for ( let j = 0; j < textBox.contentFormatted.length; j++) {
// 							const contentFormatted = textBox.contentFormatted[j];
// 							for ( let k = 0; k < contentFormatted.textStyleRanges.length; k++) {
// 								const tsr = contentFormatted.textStyleRanges[k];

// 								//if this text chunk has the old color, give it the new one
// 								if((Number(oldCMYK[0]) == Math.round(tsr.fillColorC) &&
// 										Number(oldCMYK[1]) == Math.round(tsr.fillColorM) &&
// 										Number(oldCMYK[2]) == Math.round(tsr.fillColorY) &&
// 										Number(oldCMYK[3]) == Math.round(tsr.fillColorK)) &&
// 										oldCMYK[4] == tsr.fillColorSpace){

// 									//Match found
// 									tsr.fillColorR = swatch.red;
// 									tsr.fillColorG = swatch.green;
// 									tsr.fillColorB = swatch.blue;
// 									tsr.fillColorC = swatch.cyan;
// 									tsr.fillColorM = swatch.magenta;
// 									tsr.fillColorY = swatch.yellow;
// 									tsr.fillColorK = swatch.black;
// 									tsr.modified = swatch.modified;
// 									tsr.fillColorSpace = swatch.colorSpace;
// 									tsr.fillSpotValue = swatch.spotValue;

// 									if(swatch.modified){
// 										textBox.modified = true;
// 										/* Update the client-side text box so that it knows it has been modified
// 										 and doesn't accidentally overwrite the IDS modified flag later on */
// 										this.textBoxes[l].modified = true;
// 									}
// 								}
// 							}
// 						}
// 					}
// 				}
// 			}

// 			//Make sure text swatch changes persist to text editing/formatting/input interaction
// 			swatch.updateTextColorIds();
// 		}
// 	}
// };

// DesignStudioItem.prototype.enforceFoilScope = function () {
// 	/* FOIL SCOPE: BOX */
// //	for ( var l = 0; l < this.textBoxes.length; l++) {
// //		var textBox = this.textBoxes[l];
// //		if(textBox.contentType == 'month' || textBox.contentType == 'highlightDate') break;
// //		if(!textBox.lockedColor){
// //			var foiledTSR = null;
// //			for ( var j = 0; j < textBox.contentFormatted.length; j++) {
// //				var contentFormatted = textBox.contentFormatted[j];
// //				for ( var k = 0; k < contentFormatted.textStyleRanges.length; k++) {
// //					var tsr = contentFormatted.textStyleRanges[k];
// //
// //					if(!foiledTSR && tsr.fillColorSpace == 'SPOT' && notNullOrEmpty(tsr.fillSpotValue)){
// //						//Found foil in this box; start update over and make sure entire box gets foiled text of the same color
// //						foiledTSR = tsr;
// //						j = -1;
// //						k = contentFormatted.textStyleRanges.length;
// //
// //					} else if(foiledTSR){
// //						//Match found
// //						tsr.fillColorR = foiledTSR.fillColorR;
// //						tsr.fillColorG = foiledTSR.fillColorG;
// //						tsr.fillColorB = foiledTSR.fillColorB;
// //						tsr.fillColorC = foiledTSR.fillColorC;
// //						tsr.fillColorM = foiledTSR.fillColorM;
// //						tsr.fillColorY = foiledTSR.fillColorY;
// //						tsr.fillColorK = foiledTSR.fillColorK;
// //						tsr.modified = foiledTSR.modified;
// //						tsr.fillColorSpace = foiledTSR.fillColorSpace;
// //						tsr.fillSpotValue = foiledTSR.fillSpotValue;
// //
// //						if(foiledTSR.modified){
// //							textBox.modified = true;
// //							/* Update the client-side text box so that it knows it has been modified
// //							 and doesn't accidentally overwrite the IDS modified flag later on */
// //							this.textBoxes[l].modified = true;
// //						}
// //					}
// //				}
// //			}
// //		}
// //	}
// 	/* FOIL SCOPE: BOX */

// 	/* FOIL SCOPE: LINE */
// 	for ( let l = 0; l < this.textBoxes.length; l++) {
// 		const textBox = this.textBoxes[l];
// 		if(textBox.contentType == 'month' || textBox.contentType == 'highlightDate') break;
// 		if(!textBox.lockedColor){

// 			//TODO: need this code? if this is just about scope, probably not an issue since they can't foil just one character on a line like a normal text box
// 			if(textBox.contentType == 'titledGroupsTable'){
// 				let stylesToProcess = [],
// 					foiledStyle = null;

// 				if(textBox.contentFormatted.titleStyle)
// 					stylesToProcess.push(textBox.contentFormatted.titleStyle);
// 				if(textBox.contentFormatted.nameStyle)
// 					stylesToProcess.push(textBox.contentFormatted.nameStyle);

// 				for(let _si = 0; _si < stylesToProcess.length; _si++){
// 					const _style = stylesToProcess[_si];
// 					const hasCharacters = notNullOrEmpty(_style.data);
// 					if(!foiledStyle && _style.fillColorSpace == 'SPOT' && notNullOrEmpty(_style.fillSpotValue) && hasCharacters){
// 						//Found foil in this box; start update over and make sure entire table gets foiled text of the same color
// 						foiledStyle = tsr;
// 						_si = -1;

// 					} else if(foiledStyle && _style.fillSpotValue != foiledStyle.fillSpotValue){
// 						//Match found
// 						_style.fillColorR = foiledStyle.fillColorR;
// 						_style.fillColorG = foiledStyle.fillColorG;
// 						_style.fillColorB = foiledStyle.fillColorB;
// 						_style.fillColorC = foiledStyle.fillColorC;
// 						_style.fillColorM = foiledStyle.fillColorM;
// 						_style.fillColorY = foiledStyle.fillColorY;
// 						_style.fillColorK = foiledStyle.fillColorK;
// 						_style.modified = foiledStyle.modified;
// 						_style.fillColorSpace = foiledStyle.fillColorSpace;
// 						_style.fillSpotValue = foiledStyle.fillSpotValue;

// 						if(foiledStyle.modified){
// 							textBox.modified = true;
// 							/* Update the client-side text box so that it knows it has been modified
// 							 and doesn't accidentally overwrite the IDS modified flag later on */
// 							this.textBoxes[l].modified = true;
// 						}
// 					}
// 				}
// 			} else {
// 				for ( let j = 0; j < textBox.contentFormatted.length; j++) {
// 					let foiledTSR = null;
// 					const contentFormatted = textBox.contentFormatted[j];
// 					for ( let k = 0; k < contentFormatted.textStyleRanges.length; k++) {
// 						var tsr = contentFormatted.textStyleRanges[k];

// 						//We only really care about foil that exists (or doesn't exist) on text the customer seeing, not line endings
// 						const tsrHasCharacters = notNullOrEmpty(tsr.contents.replace(/13|,/g,''));

// 						if(!foiledTSR && tsr.fillColorSpace == 'SPOT' && notNullOrEmpty(tsr.fillSpotValue) && tsrHasCharacters){
// 							//Found foil in this box; start update over and make sure entire box gets foiled text of the same color
// 							foiledTSR = tsr;
// 							k = -1;

// 						} else if(foiledTSR && tsr.fillSpotValue != foiledTSR.fillSpotValue){
// 							//Match found
// 							tsr.fillColorR = foiledTSR.fillColorR;
// 							tsr.fillColorG = foiledTSR.fillColorG;
// 							tsr.fillColorB = foiledTSR.fillColorB;
// 							tsr.fillColorC = foiledTSR.fillColorC;
// 							tsr.fillColorM = foiledTSR.fillColorM;
// 							tsr.fillColorY = foiledTSR.fillColorY;
// 							tsr.fillColorK = foiledTSR.fillColorK;
// 							tsr.modified = foiledTSR.modified;
// 							tsr.fillColorSpace = foiledTSR.fillColorSpace;
// 							tsr.fillSpotValue = foiledTSR.fillSpotValue;

// 							if(foiledTSR.modified){
// 								textBox.modified = true;
// 								/* Update the client-side text box so that it knows it has been modified
// 								 and doesn't accidentally overwrite the IDS modified flag later on */
// 								this.textBoxes[l].modified = true;
// 							}

// 							if(tsr.contents && tsrHasCharacters){
// 								//if there was actually text that changed (not just line breaks), tell the customer
// 								const popupHTML = '<h2>Just so you know...</h2>'+
// 													'<p>Due to print limitations, we expanded your foil selection to the entire line.</p>'+
// 													'<span class="button qc_bottomButton" onclick="javascript: HotTub.popup.closePopup();" style="float:right;">'+
// 														'<div>Got it!</div>'+
// 													'</span>';
// 								HotTub.popup.renderPopup(popupHTML, true, '', true);
// 							}
// 						}
// 					}
// 				}
// 			}
// 		}
// 	}
// 	/* FOIL SCOPE: LINE */
// };

// DesignStudioItem.prototype.maintainSingleFoilColor = function (spotColorValue) {
// 	const foilColor = getFoilColorBySpotValue(spotColorValue);
// 	if(foilColor){
// 		//The text affected by swatch color changes will get updated downstream when the IDS swatches and text are updated from these swatches
// 		if(this.colorSwatches && this.colorSwatches.length > 0){
// 			//Make sure swatches with foil are changed to this foil color
// 			for(let csi = 0; csi < this.colorSwatches.length; csi++){
// 				const colorSwatch = this.colorSwatches[csi];
// 				if(colorSwatch.foilable && colorSwatch.colorSpace == 'SPOT' && colorSwatch.spotValue){
// 					colorSwatch.updateColor(foilColor);
// 				}
// 			}
// 		}
// 	}
// };

// DesignStudioItem.prototype.updateAllColorSwatchesToSameColor = function (newColorSwatch) {
// 	for(let csi = 0; csi < this.colorSwatches.length; csi++){
// 		const colorSwatch = this.colorSwatches[csi];
// 		colorSwatch.updateColor(newColorSwatch);
// 	}
// };

// let failedSaveCount = 0;
// DesignStudioItem.prototype.save = function (dsCallback, saveChanges) {
// 	let idsURL, dsi = this;

// 	if(this.hasVarnish()){
// 		this.IDSObject.displayVarnish = true;
// 	} else {
// 		this.IDSObject.displayVarnish = false;
// 	}

// 	if(saveChanges === undefined)
// 		saveChanges = true;
// 	const doSave = saveChanges;

// 	const envgUploadLaterMsg = 'Proof Emailed After Checkout';
// 	const notesEmpty = (_.isNull(this.userDesignNotes) || _.isUndefined(this.userDesignNotes) || _.isEmpty(this.userDesignNotes));
// 	if(this.productStylecode.indexOf('ENVG') >= 0){
// 		if(isAdvancedListEditingMarket() && !_.isEmpty(this.selectedMailingListIds)){
// 			/* Advanced editing list attached, full proofing experience: make sure list saved
// 			   and "upload later" message cleared */
// 			if(!notesEmpty && this.userDesignNotes == envgUploadLaterMsg){
// 				this.updateSpecialDesignRequest('');
// 			}
// 		} else if(notesEmpty){
// 			const navComparisonResult = designStudio.navigation.compareCurrentStepToMailingList();
// 			/* Add note IF we are past the list decision page('-1' would be a step before, '0' would be
// 			   the matching step, '1' is past that step) OR we couldn't fine this page in the nav */
// 			if(navComparisonResult == null || navComparisonResult == 1){
// 				/* No advanced editing or customer waiting after checkout to upload, AND they have no
// 				   note entered, put this stock one in place */
// 				this.updateSpecialDesignRequest(envgUploadLaterMsg);
// 			}
// 		}
// 	}

// 	if(this.canHaveMailingList)
// 		designStudio.updateDocumentListMailingListInfo(this);

// 	designStudio.updateDocumentListGroup(this);
// 	designStudio.updateDocumentListUserNotes(this);
// 	designStudio.updateDocumentListItemErrors(this);
// 	this.updateSelectedAttributes();
// 	designStudio.updateDocumentListSelectedAttributes(this);

// 	if (this.documentId.indexOf('PRODUCT') < 0 && this.documentId.indexOf('MDV') < 0) {
// 		let currentTextBoxes = null,
// 			currentTextTags = null,
// 			noUpdateTextBoxes = [];
// 		if(this.isLockedForImprintEditing && this.IDSObject.textBoxes && this.IDSObject.textBoxes.length > 0){
// 			//don't need textBoxes on update call since the template is locked for imprint editing
// 			currentTextBoxes = this.IDSObject.textBoxes;
// 			this.IDSObject.textBoxes = [];
// 		} else {
// 			currentTextTags = this.IDSObject.textTags;
// 			this.IDSObject.textTags = [];

// 			if(this.IDSObject && this.IDSObject.textBoxes){
// 				for(let i = 0; i < this.IDSObject.textBoxes.length; i++){
// 					const textBox = this.IDSObject.textBoxes[i];
// 					if(DesignStudioItemText.isLegacyDateDrivenTextBoxTagName(textBox.tagName) && !DesignStudioItemText.isDynamicDateDrivenTextBox_legacyValueCheck(textBox.contentType, this.haveExistingValidLegacyDesignRequestEventDate())){
// 						noUpdateTextBoxes.push({index: i, textBox: textBox});
// 					}
// 				}
// 				if(noUpdateTextBoxes.length > 0)
// 					currentTextBoxes = _.clone(this.IDSObject.textBoxes);

// 				for(let j = 0; j < noUpdateTextBoxes.length; j++){
// 					this.IDSObject.textBoxes.remove(noUpdateTextBoxes[j].textBox);
// 				}
// 			}
// 		}

// 		let additionalSourcesJSON = designStudio.buildAdditionalSourceJSONForItem(this);

// 		if(this.isSample && this.quantity == 1 && (designStudio.dsJSON.marketId === 517 || designStudio.dsJSON.marketId === 524)){
// 			const sampleJSON = {};
// 			sampleJSON.type = 'sample';
// 			sampleJSON.sample = 'true';
// 			if(_.isNull(additionalSourcesJSON)){
// 				additionalSourcesJSON = [];
// 			}
// 			additionalSourcesJSON.push(sampleJSON);
// 		}

// 		idsURL = designStudio.baseIDSLocation + 'updateDocument?sessionId=' + this.sessionId + '&documentId=' + this.documentId + '&viewList=' + this.getAllViewSetString() + '&templateId=' + this.templateStylecode + '&saveChanges=' + (saveChanges ? 'true' : 'false&viewCache=dsOnly') + '&exportPageRange=ALL&scale=200&renderAllSizes=true&r=' + Math.random() + ':' + new Date().getTime();

// 		if(this.hasFoilColor() || this.hasVarnish()){
// 			idsURL += '&exportOverprintMasks=true';
// 		}

// 		const variation = this.getSelectedVariationAttribute();
// 		if(!_.isNull(variation) && !_.isUndefined(variation)){
// 			idsURL += '&variation=' + variation.template;
// 		}

// 		$j.ajax({
// 			url: idsURL,
// 			type: 'POST',
// 			data: 'docData=' + encodeURIComponent(JSON.stringify(this.IDSObject)) + (!_.isEmpty(additionalSourcesJSON) ? '&additionalSourceList=' + JSON.stringify(additionalSourcesJSON) : '' ) + ((saveChanges)? '&baselineJSON=' + ((!_.isNull(this.updatedBaselineJSON) && !_.isUndefined(this.updatedBaselineJSON))? encodeURIComponent(JSON.stringify(this.updatedBaselineJSON)) : '') : ''),
// 			dataType: 'text'
// 		})
// 		.done(function(data) {
// 			//dsi.updateFromIDS(data);
// 			let responseJSON = JSON.parse(data);
// 			if(typeof responseJSON === 'string'){
// 				responseJSON = JSON.parse(responseJSON);
// 			}

// 			let successful = true;
// 			for(let i = 0, x = responseJSON.length; i < x; i = i + 1){
// 				if(responseJSON[i].type.toLowerCase() == 'importfailed'){
// 					successful = false;
// 					break;
// 				}
// 			}

// 			if(successful){
// 				if(doSave === false)
// 					dsi.proofImageGenerated = true;
// 				else
// 					dsi.isSaved = true;

// 				failedSaveCount = 0;

// 				(dsCallback!== undefined && dsCallback !== null)? dsCallback(dsi) : '' ;
// 			} else {
// 				updateSessionRecoveryData();
// 				designStudio.hideModalMessage();
// 				$j('#dsItemLoadingMask').hide();
// 				designStudio.navigation.goToPreviousStep();
// 				if($j('#modal').length == 0){
// 					HotTub.dialog.infoPopupWithText("Hmmm...", "Generating your proofs is taking longer than expected. Please try again or save your work for later", true);
// 				}
// 			}
// 		})
// 		.fail(function(data) {
// 			if(failedSaveCount < 10){
// 				failedSaveCount++;
// 				setTimeout(function(){
// 					dsi.save(dsCallback, doSave);
// 				}, 2000);
// 			} else {
// 				designStudio.hideModalMessage();
// 				$j('#dsItemLoadingMask').hide();
// 				designStudio.navigation.goToPreviousStep();
// 				HotTub.dialog.infoPopupWithText("Hmmm...", "Generating your proofs is taking longer than expected. Please try again or save your work for later", true);
// 			}
// 		});

// 		if(currentTextBoxes){
// 			//Add back after side-stepping the update call
// 			this.IDSObject.textBoxes = currentTextBoxes;
// 		}
// 		if(currentTextTags){
// 			//Add back after side-stepping the update call
// 			this.IDSObject.textTags = currentTextTags;
// 		}
// 	} else {
// 		if(doSave === false)
// 			dsi.proofImageGenerated = true;
// 		else
// 			dsi.isSaved = true;
// 		(dsCallback!== undefined && dsCallback !== null)? dsCallback(dsi) : '' ;
// 	}

// };

// DesignStudioItem.prototype.clearImageCache = function(cacheName, copyToCacheName){
// 	if(cacheName && this.documentId.indexOf('PRODUCT-') === -1){
// 		const copyToCacheNameParam = (notNullOrEmpty(copyToCacheName) ? '&destCache='+copyToCacheName : ''),
// 			idsURL = designStudio.baseIDSLocation + 'deleteViewCache?sessionId=' + this.sessionId + '&documentId=' + this.documentId + '&viewCache=' + cacheName + copyToCacheNameParam + '&r=' + Math.random() + ':' + new Date().getTime();
// 		$j.ajax({
// 			url: idsURL,
// 			type: 'POST'
// 		})
// 		.done(function(data) {
// 			if(data.status != 'OK'){
// 				console.log('Problem encountered trying to clear IDS item image cache: '+data.description);
// 			} else {
// 				console.log('No problems encountered clearing IDS item image cache: '+data.description);
// 			}
// 		});
// 	}
// };

// DesignStudioItem.prototype.QUALITY_MULTIPLIER = 3;
// DesignStudioItem.prototype.placeImageIntoDocument = function (imageBox, dsCallback) {
// 	let idsURL, dsi = this;
// 	dsi.imagesBeingPlaced = (dsi.imagesBeingPlaced) ? dsi.imagesBeingPlaced+1 : 1;

// 	dsCallback = dsCallback || designStudio.updateItem;

// 	const NO_SCALE_XL_SIZE = 50000,
// 		resizeToWidth = (imageBox.getPixelWidth() > 0 ? imageBox.getPixelWidth() * DesignStudioItem.prototype.QUALITY_MULTIPLIER : NO_SCALE_XL_SIZE),
// 		resizeToHeight = (imageBox.getPixelHeight() > 0 ? imageBox.getPixelHeight() * DesignStudioItem.prototype.QUALITY_MULTIPLIER : NO_SCALE_XL_SIZE);

// 	idsURL = designStudio.baseIDSLocation + 'placeLibraryImage?sessionId=' + this.sessionId + '&documentId=' + this.documentId + '&imageName=' + (imageBox.imageName.indexOf('PO_') === -1 ? imageBox.imageName.split('.conv')[0] : imageBox.imageName) + '&maxPixelWidth=' + resizeToWidth + '&maxPixelHeight=' + resizeToHeight;

// 	const jsPromise = Promise.resolve($j.ajax({
// 		url: idsURL,
// 	})
// 	.done(function(data){
// 		dsi.imagesBeingPlaced--;
// 		imageBox.updateFromPlacedImage(data);
// 		dsCallback(imageBox);
// 	}));

// 	return jsPromise;
// };

// DesignStudioItem.prototype.placeMediaLibraryImageIntoDocument = function (imageBox, highResPath, dsCallback) {
// 	let idsURL, dsi = this;

// 	dsCallback = dsCallback || designStudio.updateItem;

// 	//Defaults to false, if true, it won't copy the preview image or copy anything to the image library
// 	const skipImageLibrary = (imageBox.contentType == 'schedule' ? 'true' : 'false');

// 	idsURL = designStudio.baseIDSLocation + 'placeMediaImage?sessionId=' + this.sessionId + '&documentId=' + this.documentId + '&highresImagePath=' + highResPath + '&maxPixelWidth=' + imageBox.getPixelWidth() + '&maxPixelHeight=' + imageBox.getPixelHeight() + '&skipImageLibrary=' + skipImageLibrary;

// 	$j.ajax({
// 		url: idsURL,
// 	})
// 	.done(function(data){
// 		imageBox.updateFromPlacedImage(data);
// 		dsCallback();
// 	});
// };

// DesignStudioItem.prototype.addMissingMediaLibraryImageToUserLibrary = function (imageBox, highResPath, dsCallback) {
// 	let idsURL, dsi = this;
// 	dsi.imagesBeingPlaced = (dsi.imagesBeingPlaced) ? dsi.imagesBeingPlaced+1 : 1;

// 	idsURL = designStudio.baseIDSLocation + 'placeMediaImage?sessionId=' + this.sessionId + '&documentId=' + this.documentId + '&highresImagePath=' + highResPath + '&maxPixelWidth=' + imageBox.getPixelWidth() + '&maxPixelHeight=' + imageBox.getPixelHeight() + '&skipImageLibrary=false';

// 	$j.ajax({
// 		url: idsURL,
// 	})
// 	.done(function(data){
// 		dsCallback();
// 		dsi.imagesBeingPlaced--;
// 	});
// };

// /****************/
// /*** Handlers ***/
// /****************/

// DesignStudioItem.prototype.handleColorChange = function(dsCallback) {
// 	this.updateIDSObject();
// 	//this.updateViewImages();
// 	this.updateColorSwatches();
// 	this.saveToIDS('ALL', dsCallback);
// };

// DesignStudioItem.prototype.handleVarnishChange = function(dsCallback) {
// 	designStudio.lockInterfaceAndShowProgressSpinner();
// 	//$j('.dsDesignViews .singleView').addClass('loading');
// 	//$j('.dsArtboard .mainImage').addClass('loading');
// 	//designStudio.addLoadingAnimation('.dsDesignViews .singleView');
// 	//designStudio.addLoadingAnimation('.dsArtboard .mainImage');

// 	this.updateIDSObject();
// 	//this.updateViewImages();
// 	dsCallback = dsCallback || designStudio.updateItem;
// 	this.saveToIDS('ALL', dsCallback);
// };

// DesignStudioItem.prototype.handleImageChange = function(imageBox, viewIndex, dsCallback) {
// 	let idsURL, dsi = this;
// 	viewIndex = viewIndex || designStudio.currentViewIndex;
// 	this.updateIDSObject();
// 	//this.updateViewImages(viewIndex);

// 	designStudio.lockInterfaceAndShowProgressSpinner();
// 	//$j('.dsDesignViews .singleView').addClass('loading');
// 	//$j('.dsArtboard .mainImage').addClass('loading');
// 	//designStudio.addLoadingAnimation('.dsDesignViews .singleView');
// 	//designStudio.addLoadingAnimation('.dsArtboard .mainImage');

// 	dsCallback = dsCallback || designStudio.updateItem;
// 	dsi.updateIDSObject();
// 	dsi.updateItemErrors();
// 	const exportPageRange = (imageBox == null || this.imageChangesCouldApplyToMultiplePages(imageBox)) ? 'ALL' : (imageBox.page+1);
// 	dsi.saveToIDS(exportPageRange, dsCallback);
// };

// DesignStudioItem.prototype.handleImageUpdate = function(imageBox, viewIndex, dsCallback) {
// 	dsCallback = dsCallback || designStudio.updateItem;
// 	this.updateIDSObject();
// 	const exportPageRange = this.imageChangesCouldApplyToMultiplePages(imageBox) ? 'ALL' : (imageBox.page+1);
// 	this.saveToIDS(exportPageRange, dsCallback);
// };

// DesignStudioItem.prototype.handleTextChange = function(textBox, viewIndex, dsCallback) {
// 	dsCallback = dsCallback || designStudio.updateItem;
// 	this.updateIDSObject();
// 	this.updateColorSwatches();
// 	this.updateItemErrors();
// 	const exportPageRange =  this.textChangesCouldApplyToMultiplePages(textBox) ? 'ALL' : (textBox.page+1);
// 	this.saveToIDS(exportPageRange, dsCallback);
// };

// DesignStudioItem.prototype.handleImprintSelectionChange = function (newSelectionId) {

// 	let selectedColorSwatch = designStudio.getFiniteSetImprintById(this, newSelectionId),
// 		currentSelection,
// 		currentValue,
// 		newValue,
// 		selectionImprints = this.getSelectionImprints(),
// 		tempImprint;

// 	newValue = selectedColorSwatch.name;

// 	currentSelection = this.getCurrentImprintSelection();
// 	if (notNull(currentSelection)) {
// 		currentValue = currentSelection.name;
// 	}

// 	if((isNull(currentValue) || currentValue.toUpperCase() === 'CREAM') && newValue.toUpperCase() === 'WHITE'){
// 		this.previewImageURL = this.previewImageURL.replace('_cream.jpg', '.jpg');
// 	} else if((isNull(currentValue) || currentValue.toUpperCase() === 'WHITE') && newValue.toUpperCase() === 'CREAM'){
// 		this.previewImageURL = this.previewImageURL.replace('.jpg', '_cream.jpg');
// 	}

// 	for (let i = 0, x = selectionImprints.length; i < x; i = i + 1) {
// 		tempImprint = selectionImprints[i];
// 		for (let j = 0, y = tempImprint.options.length; j < y; j = j + 1) {
// 			if (tempImprint.options[j].value === selectedColorSwatch.value) {
// 				tempImprint.options[j].selected = true;
// 			} else {
// 				tempImprint.options[j].selected = false;
// 			}
// 		}
// 	}

// 	this.isModified = true;
// 	this.updateStockViews();
// 	designStudio.renderItem(this);
// };

// DesignStudioItem.prototype.handleDesignImprintSelectionChange = function (newSelectionId) {

// 	let selectedFont = designStudio.getFiniteSetImprintById(this, newSelectionId),
// 		currentSelection,
// 		currentValue,
// 		newValue,
// 		fontDSJSON,
// 		selectionImprints = this.getSelectionImprints(),
// 		tempImprint;

// 	newValue = selectedFont.name;
// 	fontDSJSON = selectedFont.dsJSON;

// 	currentSelection = this.getCurrentImprintSelection();
// 	if (notNull(currentSelection)) {
// 		currentValue = currentSelection.name;
// 	}

// 	for (let i = 0, x = selectionImprints.length; i < x; i = i + 1) {
// 		tempImprint = selectionImprints[i];
// 		for (var j = 0, y = tempImprint.options.length; j < y; j = j + 1) {
// 			if (tempImprint.options[j].value === selectedFont.value) {
// 				tempImprint.options[j].selected = true;
// 			} else {
// 				tempImprint.options[j].selected = false;
// 			}
// 		}
// 	}

// 	if(!_.isNull(selectedFont) && !_.isUndefined(selectedFont) && !_.isNull(selectedFont.dsJSON) && !_.isUndefined(selectedFont.dsJSON)){
// 		const defaultSize = 14, defaultLeading = 'AUTO', defaultCapitalization = 'NORMAL', defaultOTF = '';
// 		for(var j = 0; j < this.textBoxes.length; j = j + 1){
// 			const textBox = this.textBoxes[j];
// 			for(let k = 0; k < textBox.contentFormatted.length; k = k + 1){
// 				const contentFormatted = textBox.contentFormatted[k];
// 				for(let m = 0; m < contentFormatted.textStyleRanges.length; m = m + 1){
// //					TODO: OTF application stubbed in below
// 					if(textBox.tagName.indexOf('return_address') > -1){
// 						contentFormatted.textStyleRanges[m].font = selectedFont.dsJSON.returnAddressFont.name;
// 						contentFormatted.textStyleRanges[m].pointSize = (!_.isNull(selectedFont.dsJSON.returnAddressFont.size) && !_.isUndefined(selectedFont.dsJSON.returnAddressFont.size) && !_.isEmpty(selectedFont.dsJSON.returnAddressFont.size))? selectedFont.dsJSON.returnAddressFont.size : defaultSize;
// 						contentFormatted.textStyleRanges[m].leading = (!_.isNull(selectedFont.dsJSON.returnAddressFont.leading) && !_.isUndefined(selectedFont.dsJSON.returnAddressFont.leading) && !_.isEmpty(selectedFont.dsJSON.returnAddressFont.leading))? selectedFont.dsJSON.returnAddressFont.leading : defaultLeading;
// 						contentFormatted.textStyleRanges[m].capitalization = (!_.isNull(selectedFont.dsJSON.returnAddressFont.allCaps) && !_.isUndefined(selectedFont.dsJSON.returnAddressFont.allCaps) && selectedFont.dsJSON.returnAddressFont.allCaps)? 'ALL_CAPS' : defaultCapitalization;
// //						contentFormatted.textStyleRanges[m].otf = (!_.isNull(selectedFont.dsJSON.returnAddressFont.otf) && !_.isUndefined(selectedFont.dsJSON.returnAddressFont.otf) && selectedFont.dsJSON.returnAddressFont.otf)? selectedFont.dsJSON.returnAddressFont.otf : defaultOTF;
// 					} else if(textBox.tagName.indexOf('guest_address') > -1){
// 						contentFormatted.textStyleRanges[m].font = selectedFont.dsJSON.guestAddressFont.name;
// 						contentFormatted.textStyleRanges[m].pointSize = (!_.isNull(selectedFont.dsJSON.guestAddressFont.size) && !_.isUndefined(selectedFont.dsJSON.guestAddressFont.size) && !_.isEmpty(selectedFont.dsJSON.guestAddressFont.size))? selectedFont.dsJSON.guestAddressFont.size : defaultSize;
// 						contentFormatted.textStyleRanges[m].leading = (!_.isNull(selectedFont.dsJSON.guestAddressFont.leading) && !_.isUndefined(selectedFont.dsJSON.guestAddressFont.leading) && !_.isEmpty(selectedFont.dsJSON.guestAddressFont.leading))? selectedFont.dsJSON.guestAddressFont.leading : defaultLeading;
// 						contentFormatted.textStyleRanges[m].capitalization = (!_.isNull(selectedFont.dsJSON.guestAddressFont.allCaps) && !_.isUndefined(selectedFont.dsJSON.guestAddressFont.allCaps) && selectedFont.dsJSON.guestAddressFont.allCaps)? 'ALL_CAPS' : defaultCapitalization;
// //						contentFormatted.textStyleRanges[m].otf = (!_.isNull(selectedFont.dsJSON.guestAddressFont.otf) && !_.isUndefined(selectedFont.dsJSON.guestAddressFont.otf) && selectedFont.dsJSON.guestAddressFont.otf)? selectedFont.dsJSON.guestAddressFont.otf : defaultOTF;
// 					} else if(textBox.tagName.indexOf('guest_name') > -1){
// 						contentFormatted.textStyleRanges[m].font = selectedFont.dsJSON.guestNameFont.name;
// 						contentFormatted.textStyleRanges[m].pointSize = (!_.isNull(selectedFont.dsJSON.guestNameFont.size) && !_.isUndefined(selectedFont.dsJSON.guestNameFont.size) && !_.isEmpty(selectedFont.dsJSON.guestNameFont.size))? selectedFont.dsJSON.guestNameFont.size : defaultSize;
// 						contentFormatted.textStyleRanges[m].leading = (!_.isNull(selectedFont.dsJSON.guestNameFont.leading) && !_.isUndefined(selectedFont.dsJSON.guestNameFont.leading) && !_.isEmpty(selectedFont.dsJSON.guestNameFont.leading))? selectedFont.dsJSON.guestNameFont.leading : defaultLeading;
// 						contentFormatted.textStyleRanges[m].capitalization = (!_.isNull(selectedFont.dsJSON.guestNameFont.allCaps) && !_.isUndefined(selectedFont.dsJSON.guestNameFont.allCaps) && selectedFont.dsJSON.guestNameFont.allCaps)? 'ALL_CAPS' : defaultCapitalization;
// //						contentFormatted.textStyleRanges[m].otf = (!_.isNull(selectedFont.dsJSON.guestNameFont.otf) && !_.isUndefined(selectedFont.dsJSON.guestNameFont.otf) && selectedFont.dsJSON.guestNameFont.otf)? selectedFont.dsJSON.guestNameFont.otf : defaultOTF;
// 					}
// 				}
// 			}
// 		}
// 	}

// 	this.isModified = true;
// 	this.updateIDSObject();
// 	this.saveToIDS('ALL');
// };

// DesignStudioItem.prototype.handleEnvelopeDesignSelectionChange = function (newSelectionId) {
// 	let selectedEnvelopeDesignId = parseInt(newSelectionId.split('_')[1]),
// 		selectedEnvelopeAttribute,
// 		dsi = this;

// 	$j('.designEnvelopeContainer').each(function(){
// 		$j(this).removeClass('selected');
// 	});

// 	$j('#' + newSelectionId).parents('.designEnvelopeContainer').addClass('selected');

// 	designStudio.lockInterfaceAndShowProgressSpinner();
// 	//designStudio.addLoadingAnimation('.dsDesignViews .singleView');
// 	//designStudio.addLoadingAnimation('.dsArtboard .mainImage');

// 	selectedEnvelopeAttribute = this.getAttributeById(selectedEnvelopeDesignId);
// 	this.envelopeAttribute = selectedEnvelopeAttribute;

// 	this.templateStylecode = selectedEnvelopeAttribute.template;
// 	designStudio.dsJSON.documentList[designStudio.dsJSON.documentList.length - 1].templateStylecode = selectedEnvelopeAttribute.template;

// 	let newGetDOLUrl = '/ids/setupSession?';

// 	newGetDOLUrl += "sessionId=" + encodeURIComponent(designStudio.user.sessionId);
// 	newGetDOLUrl += "&documentId=NEW-DOCUMENT-FROM-TEMPLATE";
// 	newGetDOLUrl += "&templateId=" + selectedEnvelopeAttribute.template;

// 	const variation = this.getSelectedVariationAttribute();
// 	if(!_.isNull(variation) && !_.isUndefined(variation)){
// 		newGetDOLUrl += '&variation=' + variation.template;
// 	}

// 	newGetDOLUrl += "&r=" + Math.floor(Math.random()*11111);

// 	$j.ajax({
// 		method: 'GET',
// 		timeout: 300000,
// 		async: true,
// 		url: newGetDOLUrl,
// 		success : function( data ) {
// 			var dolSessionId = data.description.split(":")[0],
// 				dolDocumentIdString = data.description.split(":")[1],
// 				productIdList = {},
// 				productList = {},
// 				encodedColorPalette = '';

// 			dsi.updateViews();
// 			dsi.updateSelectedAttributes();

// 			designStudio.updateDocumentListDocumentId(dsi, dolDocumentIdString);
// 			dsi.documentId = dolDocumentIdString;

// 			dsi.recalcProofingViews();

// 			var encodedColorPalette = dsi.getEncodedColorPalette();
// 			dsi.colorPalette = encodedColorPalette;

// 			const imprintData = dsi.getAddressTagTextForDefaultImprintData();
// 			const skipImageRender = (this.isLockedForImprintEditing) ? 'true' : 'false';
// 			let productViewString = dsi.getProductDSViewSetString();

// 			if(dsi.isGuestAddress())
// 				productViewString = dsi.includeEnvgEditingViewOnViewList(productViewString);

// 			let idsURL = designStudio.baseIDSLocation +'getDocument?'+
// 				'sessionId=' + dsi.sessionId +
// 				'&documentId=' + dsi.documentId +
// 				'&viewList=' + productViewString +
// 				'&templateId=' + dsi.templateStylecode +
// 				'&skipImageRender=' + skipImageRender +
// 				'&initialColorPalette=' + ((dsi.isForKraftEnvelope())? 's:monochrome-for-kraft:' : ((dsi.colorPalette !== undefined && dsi.colorPalette !== null && dsi.colorPalette !== '')? dsi.colorPalette : null)) +
// 				imprintData +
// 				'&r=' + Math.random() + ':' + new Date().getTime() +
// 				 ((!_.isNull(designStudio.dsJSON.attributeSubstrateToUse) && !_.isUndefined(designStudio.dsJSON.attributeSubstrateToUse))? '&additionalSourceList=[{"type":"substrate", "substrate":"' + designStudio.dsJSON.attributeSubstrateToUse.toLowerCase().replace(/\s/g, '') + '"}]' : '' );

// 			if(skipImageRender != 'false' && this.colorPalette !== undefined && this.colorPalette !== null && this.colorPalette !== '' && (this.colorPalette.toLowerCase().indexOf('foil') > 0 || this.colorPalette.toLowerCase().indexOf('varnish') > 0)){
// 				idsURL += '&exportOverprintMasks=true';
// 			}

// 			const variation = dsi.getSelectedVariationAttribute();
// 			if(!_.isNull(variation) && !_.isUndefined(variation)){
// 				idsURL += '&variation=' + variation.template;
// 			}

// 			$j.ajax({
// 				url: idsURL
// 			})
// 			.done(function(data) {
// 				dsi.colorSwatches = [];
// 				dsi.textBoxes = [];
// 				dsi.imageBoxes = [];
// 				dsi.updateFromIDS(data);
// 				designStudio.renderItem(dsi) ;
// 			});
// 		},
// 		error: function(data) {
// 			if (rerunGetDSSession) {
// 				user.sessionId = null;
// 				new_loadDOL(user, dolJSON, dsCallback);
// 			}
// 			rerunGetDSSession = false;
// 		}
// 	});

// 	this.isModified = true;
// 	this.updateIDSObject();
// };

// DesignStudioItem.prototype.getAddressTagTextForDefaultImprintData = function(){
// 	let imprintData = '',
// 		dsi = this;
// 	if(dsi.IDSObject && dsi.IDSObject.textBoxes && !dsi.itemHasTextBoxWithStockRecipientAddressLineText()){
// 		const textForTransfer = _.reduce(dsi.textBoxes, function(compiledText, textBox){
// 			if(textBox.tagName === 'return_address'){
// 				//TODO: use this if 'return_address' is fixed to consitently encapsulate the name line (ENTIRE return address)
// 				//return textBox.getPlainTextContentsWithNewLines();
// 				return compiledText + textBox.getPlainTextContentsWithNewLines();
// 			} else if(textBox.tagName === 'return_address1'){
// 				return compiledText + textBox.getPlainTextContentsWithNewLines();
// 			} else if(textBox.tagName === 'your_name0'){
// 				return textBox.getPlainTextContentsWithNewLines() + '\n' + compiledText;
// 			} else if(textBox.tagName === 'info0'){
// 				return compiledText + '\n' + textBox.getPlainTextContentsWithNewLines();
// 			} else if(textBox.tagName === 'orgname0'){
// 				return compiledText + textBox.getPlainTextContentsWithNewLines();
// 			}
// 			return compiledText;
// 		}, '');

// 		if(notNullOrEmpty(textForTransfer)){
// 			let envTextTagsJSONList = [],
// 				fullAddressString = textForTransfer.replace(/\n/g, '\r'),
// 				textLinesList = textForTransfer.split('\n'),
// 				nameLine = textLinesList.shift(),
// 				addressLines = textLinesList.join('\r');

// 			if(notNullOrEmpty(fullAddressString)){
// 				envTextTagsJSONList.push(DesignStudioItem.getTextTagJSON('return_address', fullAddressString));
// 			}

// 			if(notNullOrEmpty(nameLine)){
// 				envTextTagsJSONList.push(DesignStudioItem.getTextTagJSON('your_name0', nameLine));
// 				envTextTagsJSONList.push(DesignStudioItem.getTextTagJSON('orgname0', nameLine));
// 			}

// 			if(notNullOrEmpty(addressLines)){
// 				envTextTagsJSONList.push(DesignStudioItem.getTextTagJSON('return_address1', addressLines));
// 				envTextTagsJSONList.push(DesignStudioItem.getTextTagJSON('info0', addressLines));
// 				envTextTagsJSONList.push(DesignStudioItem.getTextTagJSON('address0', nameLine));
// 			}

// 			envTextTagsJSONList = filterEmptyStringsFromList(envTextTagsJSONList);
// 			imprintData += '&defaultImprintData=' + encodeURIComponent('[') + envTextTagsJSONList.join(',') + encodeURIComponent(']');
// 		}
// 	}
// 	return imprintData;
// };

// DesignStudioItem.getTextTagJSON = function(tagName, text){
// 	return encodeURIComponent(JSON.stringify({
// 		tagName : tagName,
// 		data : text
// 	}));
// };

// DesignStudioItem.prototype.itemHasTextBoxWithStockRecipientAddressLineText = function () {
// 	const dsi = this,
// 		STOCK_TEXT = 'Your Name';
// 	return _.reduce(dsi.textBoxes, function(hasStockNameRecipientAddressLine, textBox){
// 		return textBox.getFlattenedPlainTextContents().toLowerCase().indexOf(STOCK_TEXT.toLowerCase()) > -1;
// 	}, false);
// };

// DesignStudioItem.prototype.handleSubstrateSelectionChange = function (newSelectionId) {
// 	designStudio.lockInterfaceAndShowProgressSpinner();
// 	//$j('.dsDesignViews .singleView').addClass('loading');
// 	//$j('.dsArtboard .mainImage').addClass('loading');
// 	//designStudio.addLoadingAnimation('.dsDesignViews .singleView');
// 	//designStudio.addLoadingAnimation('.dsArtboard .mainImage');

// 	let selectedSubstrateId = newSelectionId.split('_')[1],
// 		currentSelection,
// 		currentValue,
// 		newValue,
// 		selectionImprints = this.getSelectionImprints(),
// 		tempImprint;

// 	const selectedSubstrateAttribute = this.getAttributeById(parseInt(selectedSubstrateId));
// 	if(!_.isNull(selectedSubstrateAttribute)){
// 		if(designStudio.hasEnvelopePrintedItem(designStudio.currentDSItem.productStylecode.split('-')[1]) && selectedSubstrateAttribute.webDescription.toUpperCase().indexOf('KRAFT') >= 0){
// 			HotTub.dialog.infoPopupWithText(
// 				selectedSubstrateAttribute.webDescription + " envelopes are only available with black address printing.",
// 				"Any address printing will be updated accordingly. Would you like to choose " + selectedSubstrateAttribute.webDescription.toLowerCase() + "?",
// 				true,
// 				"Cancel",
// 				function(){
// 					designStudio.unlockInterfaceAndRemoveProgressSpinner();
// 					$j('.mainImage').removeClass('loading');
// 					$j('.mainImage').find('.loadingAnimation').remove();
// 					//$j('.mainImage').find('.sk-spinner').remove();
// 					HotTub.dialog.handleClose();
// 				},
// 				"Choose " + selectedSubstrateAttribute.webDescription,
// 				function(){
// 					designStudio.currentDSItem.substrateAttribute = selectedSubstrateAttribute;
// 					designStudio.currentDSItem.updateSelectedAttributes();
// 					const envItem = designStudio.getEnvelopeInEditing(),
// 						addressingItem = designStudio.getAddressingItem(designStudio.currentDSItem.productStylecode.split('-')[1]),
// 						returnAddressItem = designStudio.getSelectedReturnAddressPrintingForEnvelopeItem(envItem),
// 						guestAddressItem = designStudio.getSelectedGuestAddressPrintingForEnvelopeItem(envItem);

// 					if(!_.isNull(addressingItem) && !_.isUndefined(addressingItem)){
// 						addressingItem.updateColorsToBlack();
// 						addressingItem.handleColorChange(function(){
// 							if(guestAddressItem){
// 								designStudio.updateEnvelopeGuestAddressColors(addressingItem, false);
// 							}
// 							if(returnAddressItem){
// 								designStudio.updateEnvelopeReturnAddressColors(addressingItem, false);
// 							}
// 							designStudio.currentDSItem.handleSubstrateSelectionChangeUpdateImageAndRender(selectedSubstrateAttribute);
// 							designStudio.setEnvelopeAddressingEvents(addressingItem);
// 						});
// 					} else {
// 						designStudio.currentDSItem.handleSubstrateSelectionChangeUpdateImageAndRender(selectedSubstrateAttribute);
// 						designStudio.setEnvelopeAddressingEvents(addressingItem);
// 					}

// 					HotTub.dialog.handleClose();
// 				}
// 			);
// 		} else {
// 			this.handleSubstrateSelectionChangeUpdateImageAndRender(selectedSubstrateAttribute);
// 			const addressingItem = designStudio.getAddressingItem(designStudio.currentDSItem.productStylecode.split('-')[1]);
// 			if(!_.isNull(addressingItem) && !_.isUndefined(addressingItem)){
// 				designStudio.setEnvelopeAddressingEvents(addressingItem);
// 			}
// 		}
// 	} else {
// 		this.isModified = true;
// 		this.updateStockViews();
// 		designStudio.renderViews(this);
// 		designStudio.renderMainImage(this, designStudio.currentDSItem.getFirstVisibleViewIndex(), designStudio.handleMainImageChange);
// 	}

// };

// DesignStudioItem.prototype.setSubstrateByAttributeIdFromPrompt = function (substrateId) {
// 	const substrateAttribute = this.getAttributeById(substrateId);
// 	this.substrateAttribute = substrateAttribute;
// 	this.updateSelectedAttributes(substrateId);
// 	HotTub.popup.closePopup();
// }

// DesignStudioItem.prototype.handleSubstrateSelectionChangeUpdateImageAndRender = function (selectedSubstrateAttribute) {
// 	this.substrateAttribute = selectedSubstrateAttribute;
// 	this.updateSelectedAttributes();

// 	/*this.previewImageURL = this.previewImageURL.replace('_white', '').replace('_kraft', '').replace('_pearl', '');
// 	if(selectedSubstrateAttribute.webDescription.toUpperCase().indexOf('WHITE') >= 0){
// 		this.previewImageURL = this.previewImageURL.replace('?', '_white?');
// 	} else if(selectedSubstrateAttribute.webDescription.toUpperCase().indexOf('KRAFT') >= 0){
// 		this.previewImageURL = this.previewImageURL.replace('?', '_kraft?');
// 	} else if(selectedSubstrateAttribute.webDescription.toUpperCase().indexOf('PEARL') >= 0){
// 		this.previewImageURL = this.previewImageURL.replace('?', '_pearl?');
// 	}*/

// 	$j('.substrateSwatch').each(function(){
// 		if($j(this).get(0).id.split('_')[1] == selectedSubstrateAttribute.id){
// 			$j(this).addClass('selected');
// 			$j(this).parents('.designColorSwatchContainer').addClass('selected');
// 		} else {
// 			$j(this).removeClass('selected');
// 			$j(this).parents('.designColorSwatchContainer').removeClass('selected');
// 		}
// 	});

// 	this.isModified = true;
// 	if(this.isMultidocument){
// 		let envelopeItem = designStudio.getEnvelopeInEditing(),
// 			envelopeMailingServiceItem = designStudio.getEnvelopeMailingServiceItem();

// 		if(this.isEnvelope()){
// 			envelopeItem = this;
// 		}
// 		if(!_.isNull(envelopeItem)){
// 			envelopeItem.renderMultidocumentViews(function(){
// 				designStudio.updateMainImage(envelopeItem);
// 				designStudio.updateViews(envelopeItem);
// 			});
// 		} else if(!_.isNull(envelopeMailingServiceItem)){
// 			envelopeMailingServiceItem.renderMultidocumentViews(function(){
// 				designStudio.updateMainImage(envelopeMailingServiceItem);
// 				designStudio.updateViews(envelopeMailingServiceItem);
// 			});
// 		}
// 	} else {
// 		this.updateStockViews();
// 		designStudio.renderViews(this);
// 		designStudio.renderMainImage(this, designStudio.currentDSItem.getFirstVisibleViewIndex(), designStudio.handleMainImageChange);
// 	}
// };

// DesignStudioItem.prototype.handleEnvelopeLinerDesignSelectionChange = function (selectedEnvelopeDesignId) {
// 	let selectedEnvelopeAttribute,
// 		dsi = this;

// 	$j('.designEnvelopeContainer').each(function(){
// 		$j(this).removeClass('selected');
// 	});

// 	const isIDSMainImage = designStudio.isIDSMainImage();

// 	designStudio.lockInterfaceAndShowProgressSpinner();
// 	//designStudio.addLoadingAnimation('.dsDesignViews .singleView');
// 	//designStudio.addLoadingAnimation('.dsArtboard .mainImage');

// 	designStudio.clearTextAndImageBoxesForItem(dsi);

// 	const selectedEnvelopeLinerAttribute = this.getAttributeById(selectedEnvelopeDesignId);
// 	this.envelopeAttribute = selectedEnvelopeLinerAttribute;

// 	if(!_.isNull(selectedEnvelopeLinerAttribute) && !_.isUndefined(selectedEnvelopeLinerAttribute)){
// 		this.templateStylecode = selectedEnvelopeLinerAttribute.template;
// 		designStudio.dsJSON.documentList[designStudio.dsJSON.documentList.length - 1].templateStylecode = selectedEnvelopeLinerAttribute.template;
// 	} else {
// 		this.templateStylecode = this.originalTemplateStylecode;
// 		designStudio.dsJSON.documentList[designStudio.dsJSON.documentList.length - 1].templateStylecode = this.originalTemplateStylecode;
// 	}

// 	let newGetDOLUrl = '/ids/setupSession?';

// 	newGetDOLUrl += "sessionId=" + encodeURIComponent(designStudio.user.sessionId);
// 	newGetDOLUrl += "&documentId=NEW-DOCUMENT-FROM-TEMPLATE";
// 	newGetDOLUrl += "&templateId=" + this.templateStylecode;

// 	const variation = this.getSelectedVariationAttribute();
// 	if(!_.isNull(variation) && !_.isUndefined(variation)){
// 		newGetDOLUrl += '&variation=' + variation.template;
// 	}

// 	newGetDOLUrl += "&r=" + Math.floor(Math.random()*11111);

// 	$j.get(newGetDOLUrl, function( data ) {
// 		var dolSessionId = data.description.split(":")[0],
// 			dolDocumentIdString = data.description.split(":")[1],
// 			productIdList = {},
// 			productList = {},
// 			encodedColorPalette = '';

// 		designStudio.updateDocumentListDocumentId(dsi, dolDocumentIdString);
// 		dsi.documentId = dolDocumentIdString;

// 		var encodedColorPalette = dsi.getEncodedColorPalette();
// 		dsi.colorPalette = encodedColorPalette;

// 		let skipImageRender = (this.isLockedForImprintEditing) ? 'true' : 'false',
// 			productViewString = dsi.getProductDSViewSetString(),
// 			envelopeItem = designStudio.getEnvelopeInEditing(),
// 			envelopeMailingServiceItem = designStudio.getEnvelopeMailingServiceItem();

// 		if(!_.isNull(envelopeItem) && !_.isUndefined(envelopeItem) && envelopeItem.isMultidocument){
// 			productViewString = envelopeItem.getProductDSViewSetString();
// 		} else if(!_.isNull(envelopeMailingServiceItem) && !_.isUndefined(envelopeMailingServiceItem) && envelopeMailingServiceItem.isMultidocument){
// 			productViewString = envelopeMailingServiceItem.getProductDSViewSetString();
// 		}
// 		let idsURL = designStudio.baseIDSLocation + 'getDocument?sessionId=' + dsi.sessionId + '&documentId=' + dsi.documentId + '&viewList=' + productViewString + '&sceneSpecificViewTagPrefix=' + dsi.typeCode + '&templateId=' + dsi.templateStylecode + '&skipImageRender=' + skipImageRender + '&initialColorPalette=' + ((dsi.isForKraftEnvelope())? 's:monochrome-for-kraft:' : ((dsi.colorPalette !== undefined && dsi.colorPalette !== null && dsi.colorPalette !== '')? dsi.colorPalette : null)) + '&r=' + Math.random() + ':' + new Date().getTime();

// 		if(skipImageRender != 'false' && this.colorPalette !== undefined && this.colorPalette !== null && this.colorPalette !== '' && (this.colorPalette.toLowerCase().indexOf('foil') > 0 || this.colorPalette.toLowerCase().indexOf('varnish') > 0)){
// 			idsURL += '&exportOverprintMasks=true';
// 		}

// 		const variation = dsi.getSelectedVariationAttribute();
// 		if(!_.isNull(variation) && !_.isUndefined(variation)){
// 			idsUrl += '&variation=' + variation.template;
// 		}

// 		$j.ajax({
// 			url: idsURL
// 		})
// 		.done(function(data) {
// 			dsi.colorSwatches = [];
// 			dsi.textBoxes = [];
// 			dsi.imageBoxes = [];
// 			dsi.updateFromIDS(data);
// 			dsi.updateViews();
// 			dsi.recalcProofingViews();
// 			dsi.updateSelectedAttributes();

// 			const envItem = designStudio.getEnvelopeInEditing(),
// 				linerItem = designStudio.getSelectedLinerForEnvelopeItem(envItem);

// 			$j('#linerSelectedContainer').html(designStudio.getSelectedLinerHTML(linerItem, linerItem));

// 			designStudio.setEnvelopeLinersEvents();
// 			//designStudio.setColorEvents(linerItem);

// 			linerItem.saveToIDS('ALL', function(){

// 				const envItem = designStudio.getEnvelopeInEditing(),
// 					linerItem = designStudio.getSelectedLinerForEnvelopeItem(envItem);

// 				if(isIDSMainImage){
// 					/*designStudio.updateMainImage(linerItem);
// 					designStudio.updateViews(linerItem);*/
// 					const envelopeMailingServiceItem = designStudio.getEnvelopeMailingServiceItem();

// 					if(!_.isNull(envItem)){
// 						envItem.renderMultidocumentViews(function(){
// 							envItem.updateMultidocumentViews();
// 							designStudio.updateMainImage(envItem);
// 							designStudio.updateViews(envItem);
// 							designStudio.renderImageBoxesOnImageOnly(linerItem, designStudio.currentViewIndex);
// 							designStudio.setImageBoxEvents(linerItem);
// 							designStudio.renderTextBoxesOnImageOnly(linerItem, designStudio.currentViewIndex);
// 							designStudio.setTextEvents(linerItem);
// 							//designStudio.handleViewChange();
// 						});
// 					} else  if(!_.isNull(envelopeMailingServiceItem)){
// 						envelopeMailingServiceItem.renderMultidocumentViews(function(){
// 							envelopeMailingServiceItem.updateMultidocumentViews();
// 							designStudio.updateMainImage(envelopeMailingServiceItem);
// 							designStudio.updateViews(envelopeMailingServiceItem);
// 							designStudio.renderImageBoxesOnImageOnly(linerItem, designStudio.currentViewIndex);
// 							designStudio.setImageBoxEvents(linerItem);
// 							designStudio.renderTextBoxesOnImageOnly(linerItem, designStudio.currentViewIndex);
// 							designStudio.setTextEvents(linerItem);
// 							//designStudio.handleViewChange();
// 						});
// 					}
// 				} else {
// 					designStudio.renderViews(linerItem);
// 					designStudio.renderMainImage(linerItem, linerItem.getFirstVisibleViewIndex(), designStudio.handleMainImageChange);
// 					designStudio.renderImageBoxesOnImageOnly(linerItem, designStudio.currentViewIndex);
// 					designStudio.setImageBoxEvents(linerItem);
// 					designStudio.renderTextBoxesOnImageOnly(linerItem, designStudio.currentViewIndex);
// 					designStudio.setTextEvents(linerItem);
// 				}

// 				//designStudio.renderViews(linerItem);
// 				//designStudio.renderMainImage(linerItem, linerItem.getFirstVisibleViewIndex(), designStudio.handleMainImageChange);
// 			});
// 			//designStudio.currentDSItem.saveToIDS();
// 			//designStudio.renderViews(designStudio.currentDSItem);
// 			//designStudio.renderMainImage(designStudio.currentDSItem, designStudio.currentDSItem.getFirstVisibleViewIndex(), designStudio.handleMainImageChange);

// 		});

// 		//dsi.forceReload = true;
// 		//designStudio.loadItem(designStudio.dsJSON.documentList.length - 1);

// 	})
// 	.fail(function(data) {
// 		if (rerunGetDSSession) {
// 			user.sessionId = null;
// 			new_loadDOL(user, dolJSON, dsCallback);
// 		}
// 		rerunGetDSSession = false;
// 	});

// 	this.isModified = true;
// 	this.updateIDSObject();
// };

// DesignStudioItem.prototype.handleGuestAddressingDesignSelectionChange = function (selectedEnvelopeDesignId) {
// 	let selectedEnvelopeAttribute,
// 		dsi = this;

// 	$j('.designEnvelopeContainer').each(function(){
// 		$j(this).removeClass('selected');
// 	});

// 	designStudio.clearTextAndImageBoxesForItem(dsi);

// 	//Clear ENVG editor panel to force DS to re-paint content using new design chosen
// 	$j('#mailingListPanel .envgEditorWrapper').remove();

// 	const isIDSMainImage = designStudio.isIDSMainImage();

// 	designStudio.lockInterfaceAndShowProgressSpinner();
// 	//designStudio.addLoadingAnimation('.dsDesignViews .singleView');
// 	//designStudio.addLoadingAnimation('.dsArtboard .mainImage');

// 	const selectedGuestAddressingAttribute = this.getAttributeById(selectedEnvelopeDesignId);
// 	this.envelopeAttribute = selectedGuestAddressingAttribute;

// 	if(!_.isNull(selectedGuestAddressingAttribute) && !_.isUndefined(selectedGuestAddressingAttribute)){
// 		this.templateStylecode = selectedGuestAddressingAttribute.template;
// 		designStudio.dsJSON.documentList[designStudio.dsJSON.documentList.length - 1].templateStylecode = selectedGuestAddressingAttribute.template;

// 	}

// 	let newGetDOLUrl = '/ids/setupSession?';

// 	newGetDOLUrl += "sessionId=" + encodeURIComponent(designStudio.user.sessionId);
// 	newGetDOLUrl += "&documentId=NEW-DOCUMENT-FROM-TEMPLATE";
// 	newGetDOLUrl += "&templateId=" + this.templateStylecode;

// 	const variation = this.getSelectedVariationAttribute();
// 	if(!_.isNull(variation) && !_.isUndefined(variation)){
// 		newGetDOLUrl += '&variation=' + variation.template;
// 	}

// 	newGetDOLUrl += "&r=" + Math.floor(Math.random()*11111);

// 	$j.get(newGetDOLUrl, function( data ) {
// 		var dolSessionId = data.description.split(":")[0],
// 			dolDocumentIdString = data.description.split(":")[1],
// 			productIdList = {},
// 			productList = {},
// 			encodedColorPalette = '';

// 		designStudio.updateDocumentListDocumentId(dsi, dolDocumentIdString);
// 		dsi.documentId = dolDocumentIdString;

// 		var encodedColorPalette = dsi.getEncodedColorPalette();
// 		dsi.colorPalette = encodedColorPalette;

// 		let skipImageRender = (this.isLockedForImprintEditing) ? 'true' : 'false',
// 			productViewString = dsi.getProductDSViewSetString(),
// 			envelopeItem = designStudio.getEnvelopeInEditing(),
// 			envelopeMailingServiceItem = designStudio.getEnvelopeMailingServiceItem();

// 		if(!_.isNull(envelopeItem) && !_.isUndefined(envelopeItem) && envelopeItem.isMultidocument){
// 			productViewString = envelopeItem.getProductDSViewSetString();
// 		} else if(!_.isNull(envelopeMailingServiceItem) && !_.isUndefined(envelopeMailingServiceItem) && envelopeMailingServiceItem.isMultidocument){
// 			productViewString = envelopeMailingServiceItem.getProductDSViewSetString();
// 		}

// 		if(dsi.isGuestAddress())
// 			productViewString = dsi.includeEnvgEditingViewOnViewList(productViewString);

// 		const imprintData = dsi.getAddressTagTextForDefaultImprintData();
// 		let idsURL = designStudio.baseIDSLocation + 'getDocument?sessionId=' + dsi.sessionId + '&documentId=' + dsi.documentId + '&viewList=' + productViewString + '&sceneSpecificViewTagPrefix=' + dsi.typeCode + '&templateId=' + dsi.templateStylecode + '&skipImageRender=' + skipImageRender + '&initialColorPalette=' + ((dsi.isForKraftEnvelope())? 's:monochrome-for-kraft:' : ((dsi.colorPalette !== undefined && dsi.colorPalette !== null && dsi.colorPalette !== '')? dsi.colorPalette : null)) + imprintData + '&r=' + Math.random() + ':' + new Date().getTime();

// 		if(skipImageRender != 'false' && this.colorPalette !== undefined && this.colorPalette !== null && this.colorPalette !== '' && (this.colorPalette.toLowerCase().indexOf('foil') > 0 || this.colorPalette.toLowerCase().indexOf('varnish') > 0)){
// 			idsURL += '&exportOverprintMasks=true';
// 		}

// 		const variation = dsi.getSelectedVariationAttribute();
// 		if(!_.isNull(variation) && !_.isUndefined(variation)){
// 			idsUrl += '&variation=' + variation.template;
// 		}

// 		$j.ajax({
// 			url: idsURL
// 		})
// 		.done(function(data) {
// 			dsi.colorSwatches = [];
// 			dsi.textBoxes = [];
// 			dsi.imageBoxes = [];
// 			dsi.updateFromIDS(data);

// 			//TODO:Initial font size is an issue, we just don't know how how to size first record going into a new design. If we want this to happen immediately, must happen in script applying changes to doc, using autosizing (new param?)
// 			//Make sure recipient address text box is updated with first recipient address (if it exists) before we save this document and generate new images downstream
// //			var updatedTextBox = dsi.updateEnvgRecipientAddressWithExampleEntry_textBox(true);
// //			if(updatedTextBox) dsi.updateIDSObject();

// 			//Reset this local values when new design selected
// 			dsi.mostRecentLinesOfTextAppliedToEnvgImage = [];
// 			dsi.mostRecentNameFontSize = null;
// 			dsi.mostRecentAddressFontSize = null;

// 			dsi.updateViews();
// 			dsi.recalcProofingViews();
// 			dsi.updateSelectedAttributes();

// 			let envItem = designStudio.getEnvelopeInEditing(),
// 				guestAddressPrintingItem = designStudio.getSelectedGuestAddressPrintingForEnvelopeItem(envItem);

// 			$j('#guestAddressSelectedContainer').html(designStudio.getSelectedGuestAddressHTML(guestAddressPrintingItem, guestAddressPrintingItem));

// 			designStudio.setEnvelopeAddressingEvents(guestAddressPrintingItem);

// 			guestAddressPrintingItem.saveToIDS('ALL', function(){
// 				const envelopeItem = designStudio.getEnvelopeItem(dsi.productStylecode.split('-')[1]),
// 					envelopeMailingServiceItem = designStudio.getEnvelopeMailingServiceItem();
// 					guestAddressPrintingItem = designStudio.getSelectedGuestAddressPrintingForEnvelopeItem(envelopeItem);

// 				if(isIDSMainImage){
// 					if(!_.isNull(envelopeItem)){
// 						envelopeItem.renderMultidocumentViews(function(){
// 							envelopeItem.updateMultidocumentViews();
// 							designStudio.updateMainImage(envelopeItem);
// 							designStudio.updateViews(envelopeItem);
// 							designStudio.renderImageBoxesOnImageOnly(guestAddressPrintingItem, designStudio.currentViewIndex);
// 							designStudio.setImageBoxEvents(guestAddressPrintingItem);
// 							designStudio.renderTextBoxesOnImageOnly(guestAddressPrintingItem, designStudio.currentViewIndex);
// 							designStudio.setTextEvents(guestAddressPrintingItem);
// 						});
// 					} else  if(!_.isNull(envelopeMailingServiceItem)){
// 						envelopeMailingServiceItem.renderMultidocumentViews(function(){
// 							envelopeMailingServiceItem.updateMultidocumentViews();
// 							designStudio.updateMainImage(envelopeMailingServiceItem);
// 							designStudio.updateViews(envelopeMailingServiceItem);
// 							designStudio.renderImageBoxesOnImageOnly(guestAddressPrintingItem, designStudio.currentViewIndex);
// 							designStudio.setImageBoxEvents(guestAddressPrintingItem);
// 							designStudio.renderTextBoxesOnImageOnly(guestAddressPrintingItem, designStudio.currentViewIndex);
// 							designStudio.setTextEvents(guestAddressPrintingItem);
// 						});
// 					}
// 				} else {
// 					designStudio.renderViews(guestAddressPrintingItem);
// 					designStudio.renderMainImage(guestAddressPrintingItem, guestAddressPrintingItem.getFirstVisibleViewIndex(), designStudio.handleMainImageChange);
// 					designStudio.renderImageBoxesOnImageOnly(guestAddressPrintingItem, designStudio.currentViewIndex);
// 					designStudio.setImageBoxEvents(guestAddressPrintingItem);
// 					designStudio.renderTextBoxesOnImageOnly(guestAddressPrintingItem, designStudio.currentViewIndex);
// 					designStudio.setTextEvents(guestAddressPrintingItem);
// 				}

// 				designStudio.loadMailingListsForItem(guestAddressPrintingItem);
// 				designStudio.updateEnvelopeSubNavBasedOnSelectionChanges();
// 			});
// 			//designStudio.currentDSItem.saveToIDS();
// 			//designStudio.renderViews(designStudio.currentDSItem);
// 			//designStudio.renderMainImage(designStudio.currentDSItem, designStudio.currentDSItem.getFirstVisibleViewIndex(), designStudio.handleMainImageChange);
// 		});
// 		//dsi.forceReload = true;
// 		//designStudio.loadItem(designStudio.dsJSON.documentList.length - 1);
// 	})
// 	.fail(function(data) {
// 		if (rerunGetDSSession) {
// 			user.sessionId = null;
// 			new_loadDOL(user, dolJSON, dsCallback);
// 		}
// 		rerunGetDSSession = false;
// 	});

// 	this.isModified = true;
// 	this.updateIDSObject();
// };

// DesignStudioItem.prototype.handleReturnAddressingDesignSelectionChange = function (selectedEnvelopeDesignId) {
// 	let selectedEnvelopeAttribute,
// 		dsi = this;

// 	$j('.designEnvelopeContainer').each(function(){
// 		$j(this).removeClass('selected');
// 	});

// 	designStudio.clearTextAndImageBoxesForItem(dsi);

// 	const isIDSMainImage = designStudio.isIDSMainImage();

// 	designStudio.lockInterfaceAndShowProgressSpinner();
// 	//designStudio.addLoadingAnimation('.dsDesignViews .singleView');
// 	//designStudio.addLoadingAnimation('.dsArtboard .mainImage');

// 	const selectedReturnAddressingAttribute = this.getAttributeById(selectedEnvelopeDesignId);
// 	this.envelopeAttribute = selectedReturnAddressingAttribute;

// 	if(!_.isNull(selectedReturnAddressingAttribute) && !_.isUndefined(selectedReturnAddressingAttribute)){
// 		this.templateStylecode = selectedReturnAddressingAttribute.template;
// 		designStudio.dsJSON.documentList[designStudio.dsJSON.documentList.length - 1].templateStylecode = selectedReturnAddressingAttribute.template;

// 	}

// 	let newGetDOLUrl = '/ids/setupSession?';

// 	newGetDOLUrl += "sessionId=" + encodeURIComponent(designStudio.user.sessionId);
// 	newGetDOLUrl += "&documentId=NEW-DOCUMENT-FROM-TEMPLATE";
// 	newGetDOLUrl += "&templateId=" + this.templateStylecode;

// 	const variation = this.getSelectedVariationAttribute();
// 	if(!_.isNull(variation) && !_.isUndefined(variation)){
// 		newGetDOLUrl += '&variation=' + variation.template;
// 	}

// 	newGetDOLUrl += "&r=" + Math.floor(Math.random()*11111);

// 	$j.get(newGetDOLUrl, function( data ) {
// 		var dolSessionId = data.description.split(":")[0],
// 			dolDocumentIdString = data.description.split(":")[1],
// 			productIdList = {},
// 			productList = {},
// 			encodedColorPalette = '';

// 		designStudio.updateDocumentListDocumentId(dsi, dolDocumentIdString);
// 		dsi.documentId = dolDocumentIdString;

// 		var encodedColorPalette = dsi.getEncodedColorPalette();
// 		dsi.colorPalette = encodedColorPalette;

// 		const skipImageRender = (this.isLockedForImprintEditing) ? 'true' : 'false';
// 		let productViewString = dsi.getProductDSViewSetString();
// 		let envelopeItem = designStudio.getEnvelopeItem(dsi.productStylecode.split('-')[1]),
// 			envelopeMailingServiceItem = designStudio.getEnvelopeMailingServiceItem();

// 		if(_.isNull(envelopeItem) && !_.isNull(envelopeMailingServiceItem) && !_.isUndefined(envelopeMailingServiceItem)){
// 			envelopeItem = envelopeMailingServiceItem;
// 		}

// 		if(!_.isNull(envelopeItem) && !_.isUndefined(envelopeItem) && envelopeItem.isMultidocument){
// 			productViewString = envelopeItem.getProductDSViewSetString();
// 		} else if(!_.isNull(envelopeMailingServiceItem) && !_.isUndefined(envelopeMailingServiceItem) && envelopeMailingServiceItem.isMultidocument){
// 			productViewString = envelopeMailingServiceItem.getProductDSViewSetString();
// 		}

// 		const imprintData = dsi.getAddressTagTextForDefaultImprintData();

// 		if(!envelopeItem.isReturnAddress() && !envelopeItem.isMailingService()){
// 			const codeToUse = (designStudio.envelopeMailingServiceProductTypes.indexOf(dsi.typeCode) > -1)? 'ENVR' : dsi.typeCode;
// 			productViewString = productViewString + '&sceneSpecificViewTagPrefix=' + codeToUse;
// 		}

// 		let idsURL = designStudio.baseIDSLocation + 'getDocument?sessionId=' + dsi.sessionId + '&documentId=' + dsi.documentId + '&viewList=' + productViewString + '&templateId=' + dsi.templateStylecode + '&skipImageRender=' + skipImageRender + '&initialColorPalette=' + ((dsi.isForKraftEnvelope())? 's:monochrome-for-kraft:' : ((dsi.colorPalette !== undefined && dsi.colorPalette !== null && dsi.colorPalette !== '')? dsi.colorPalette : null)) + imprintData + '&r=' + Math.random() + ':' + new Date().getTime();

// 		if(skipImageRender != 'false' && this.colorPalette !== undefined && this.colorPalette !== null && this.colorPalette !== '' && (this.colorPalette.toLowerCase().indexOf('foil') > 0 || this.colorPalette.toLowerCase().indexOf('varnish') > 0)){
// 			idsURL += '&exportOverprintMasks=true';
// 		}

// 		const variation = dsi.getSelectedVariationAttribute();
// 		if(!_.isNull(variation) && !_.isUndefined(variation)){
// 			idsUrl += '&variation=' + variation.template;
// 		}

// 		$j.ajax({
// 			url: idsURL
// 		})
// 		.done(function(data) {
// 			dsi.colorSwatches = [];
// 			dsi.textBoxes = [];
// 			dsi.imageBoxes = [];
// 			dsi.updateFromIDS(data);
// 			dsi.updateViews();
// 			dsi.recalcProofingViews();
// 			dsi.updateSelectedAttributes();

// 			let envItem = designStudio.getEnvelopeInEditing(),
// 				envelopeMailingServiceItem = designStudio.getSelectedMailingServiceForEnvelopeItem(envItem),
// 				returnAddressItem = designStudio.getSelectedReturnAddressPrintingForEnvelopeItem(envItem);

// 			if(!_.isNull(envelopeMailingServiceItem) && !_.isUndefined(envelopeMailingServiceItem)){
// 				$j('#returnAddressSelectedContainer').html(designStudio.getSelectedReturnAddressHTML(envelopeMailingServiceItem, envelopeMailingServiceItem));
// 				returnAddressItem = envelopeMailingServiceItem;
// 			} else {
// 				$j('#returnAddressSelectedContainer').html(designStudio.getSelectedReturnAddressHTML(returnAddressItem, returnAddressItem));
// 			}

// 			if(!_.isNull(envelopeMailingServiceItem) && !_.isUndefined(envelopeMailingServiceItem)){
// 				designStudio.setMailingServiceAddressingEvents(envelopeMailingServiceItem);
// 			} else {
// 				designStudio.setEnvelopeAddressingEvents(returnAddressItem);
// 			}

// 			returnAddressItem.saveToIDS('ALL', function(){
// 				if(isIDSMainImage){
// 					const envelopeItem = designStudio.getEnvelopeItem(dsi.productStylecode.split('-')[1]), envelopeMailingServiceItem = designStudio.getEnvelopeMailingServiceItem();
// 					if(!_.isNull(envelopeItem) && envelopeItem.isMultidocument){
// 						envelopeItem.renderMultidocumentViews(function(){
// 							envelopeItem.updateMultidocumentViews();
// 							designStudio.updateMainImage(envelopeItem);
// 							designStudio.updateViews(envelopeItem);
// 							designStudio.renderImageBoxesOnImageOnly(returnAddressItem, designStudio.currentViewIndex);
// 							designStudio.setImageBoxEvents(returnAddressItem);
// 							designStudio.renderTextBoxesOnImageOnly(returnAddressItem, designStudio.currentViewIndex);
// 							designStudio.setTextEvents(returnAddressItem);
// 						});
// 					} else if(!_.isNull(envelopeItem) && !envelopeItem.isMultidocument){
// 						envelopeItem.updateViews();
// 						designStudio.updateMainImage(envelopeItem);
// 						designStudio.updateViews(envelopeItem);
// 						designStudio.renderImageBoxesOnImageOnly(envelopeItem, designStudio.currentViewIndex);
// 						designStudio.setImageBoxEvents(envelopeItem);
// 						designStudio.renderTextBoxesOnImageOnly(envelopeItem, designStudio.currentViewIndex);
// 						designStudio.setTextEvents(envelopeItem);

// 					} else if(!_.isNull(envelopeMailingServiceItem)){
// 						envelopeMailingServiceItem.updateViews();
// 						designStudio.updateMainImage(envelopeMailingServiceItem);
// 						designStudio.updateViews(envelopeMailingServiceItem);
// 						designStudio.renderImageBoxesOnImageOnly(returnAddressItem, designStudio.currentViewIndex);
// 						designStudio.setImageBoxEvents(returnAddressItem);
// 						designStudio.renderTextBoxesOnImageOnly(returnAddressItem, designStudio.currentViewIndex);
// 						designStudio.setTextEvents(returnAddressItem);
// 					}
// 				} else {
// 					designStudio.renderViews(returnAddressItem);
// 					designStudio.renderMainImage(returnAddressItem, returnAddressItem.getFirstVisibleViewIndex(), designStudio.handleMainImageChange);
// 					designStudio.renderImageBoxesOnImageOnly(returnAddressItem, designStudio.currentViewIndex);
// 					designStudio.setImageBoxEvents(returnAddressItem);
// 					designStudio.renderTextBoxesOnImageOnly(returnAddressItem, designStudio.currentViewIndex);
// 					designStudio.setTextEvents(returnAddressItem);
// 				}

// 				designStudio.updateEnvelopeSubNavBasedOnSelectionChanges();
// 			});
// 			//designStudio.currentDSItem.saveToIDS();
// 			//designStudio.renderViews(designStudio.currentDSItem);
// 			//designStudio.renderMainImage(designStudio.currentDSItem, designStudio.currentDSItem.getFirstVisibleViewIndex(), designStudio.handleMainImageChange);

// 		});

// 		//dsi.forceReload = true;
// 		//designStudio.loadItem(designStudio.dsJSON.documentList.length - 1);

// 	})
// 	.fail(function(data) {
// 		if (rerunGetDSSession) {
// 			user.sessionId = null;
// 			new_loadDOL(user, dolJSON, dsCallback);
// 		}
// 		rerunGetDSSession = false;
// 	});

// 	this.isModified = true;
// 	this.updateIDSObject();
// };

// DesignStudioItem.prototype.handleEnvelopeLabelSelectionChange = function (selectedEnvelopeLabelProductId) {
// 	let selectedEnvelopeAttribute,
// 		dsi = this;

// 	$j('.designEnvelopeContainer').each(function(){
// 		$j(this).removeClass('selected');
// 	});

// 	designStudio.clearTextAndImageBoxesForItem(dsi);

// 	const isIDSMainImage = designStudio.isIDSMainImage();

// 	designStudio.lockInterfaceAndShowProgressSpinner();
// 	//designStudio.addLoadingAnimation('.dsDesignViews .singleView');
// 	//designStudio.addLoadingAnimation('.dsArtboard .mainImage');

// 	let newGetDOLUrl = '/ids/setupSession?';

// 	newGetDOLUrl += "sessionId=" + encodeURIComponent(designStudio.user.sessionId);
// 	newGetDOLUrl += "&documentId=NEW-DOCUMENT-FROM-TEMPLATE";
// 	newGetDOLUrl += "&templateId=" + this.templateStylecode;
// 	newGetDOLUrl += "&r=" + Math.floor(Math.random()*11111);

// 	$j.get(newGetDOLUrl, function( data ) {
// 		var dolSessionId = data.description.split(":")[0],
// 			dolDocumentIdString = data.description.split(":")[1],
// 			productIdList = {},
// 			productList = {},
// 			encodedColorPalette = '';

// 		designStudio.updateDocumentListDocumentId(dsi, dolDocumentIdString);
// 		dsi.documentId = dolDocumentIdString;

// 		var encodedColorPalette = dsi.getEncodedColorPalette();
// 		dsi.colorPalette = encodedColorPalette;

// 		let skipImageRender = (dsi.isLockedForImprintEditing) ? 'true' : 'false',
// 			productViewString = dsi.getProductDSViewSetString(),
// 			envelopeItem = designStudio.getEnvelopeInEditing(),
// 			envelopeMailingServiceItem = designStudio.getEnvelopeMailingServiceItem();

// 		if(!_.isNull(envelopeItem) && !_.isUndefined(envelopeItem) && envelopeItem.isMultidocument){
// 			productViewString = envelopeItem.getProductDSViewSetString();
// 		} else if(!_.isNull(envelopeMailingServiceItem) && !_.isUndefined(envelopeMailingServiceItem) && envelopeMailingServiceItem.isMultidocument){
// 			productViewString = envelopeMailingServiceItem.getProductDSViewSetString();
// 		}
// 		let idsURL = designStudio.baseIDSLocation + 'getDocument?sessionId=' + dsi.sessionId + '&documentId=' + dsi.documentId + '&viewList=' + productViewString + '&sceneSpecificViewTagPrefix=' + dsi.typeCode + '&templateId=' + dsi.templateStylecode + '&skipImageRender=' + skipImageRender + '&initialColorPalette=' + ((dsi.isForKraftEnvelope())? 's:monochrome-for-kraft:' : ((dsi.colorPalette !== undefined && dsi.colorPalette !== null && dsi.colorPalette !== '')? dsi.colorPalette : null)) + '&r=' + Math.random() + ':' + new Date().getTime();

// 		if(skipImageRender != 'false' && dsi.colorPalette !== undefined && dsi.colorPalette !== null && dsi.colorPalette !== '' && (dsi.colorPalette.toLowerCase().indexOf('foil') > 0 || dsi.colorPalette.toLowerCase().indexOf('varnish') > 0)){
// 			idsURL += '&exportOverprintMasks=true';
// 		}

// 		const variation = dsi.getSelectedVariationAttribute();
// 		if(!_.isNull(variation) && !_.isUndefined(variation)){
// 			idsURL += '&variation=' + variation.template;
// 		}

// 		$j.ajax({
// 			url: idsURL
// 		})
// 		.done(function(data) {
// 			dsi.colorSwatches = [];
// 			dsi.textBoxes = [];
// 			dsi.imageBoxes = [];
// 			dsi.updateFromIDS(data);
// 			dsi.updateViews();
// 			dsi.recalcProofingViews();
// 			dsi.updateSelectedAttributes();

// 			const envItem = designStudio.getEnvelopeInEditing(),
// 				labelOrSealItem = designStudio.getSelectedLabelOrSealForEnvelopeItem(envItem);

// 			$j('#labelSelectedContainer').html(designStudio.getSelectedLabelHTML(labelOrSealItem, labelOrSealItem));

// 			designStudio.setEnvelopeAddressingEvents(labelOrSealItem);

// 			labelOrSealItem.saveToIDS('ALL', function(){
// 				if(isIDSMainImage){
// 					const envelopeItem = designStudio.getEnvelopeInEditing(),
// 						envelopeMailingServiceItem = designStudio.getEnvelopeMailingServiceItem();

// 					if(!_.isNull(envelopeItem)){
// 						envelopeItem.renderMultidocumentViews(function(){
// 							envelopeItem.updateMultidocumentViews();
// 							designStudio.updateMainImage(envelopeItem);
// 							designStudio.updateViews(envelopeItem);
// 							designStudio.renderImageBoxesOnImageOnly(labelOrSealItem, designStudio.currentViewIndex);
// 							designStudio.setImageBoxEvents(labelOrSealItem);
// 							designStudio.renderTextBoxesOnImageOnly(labelOrSealItem, designStudio.currentViewIndex);
// 							designStudio.setTextEvents(labelOrSealItem);
// 						});
// 					} else  if(!_.isNull(envelopeMailingServiceItem)){
// 						envelopeMailingServiceItem.renderMultidocumentViews(function(){
// 							envelopeMailingServiceItem.updateMultidocumentViews();
// 							designStudio.updateMainImage(envelopeMailingServiceItem);
// 							designStudio.updateViews(envelopeMailingServiceItem);
// 							designStudio.renderImageBoxesOnImageOnly(labelOrSealItem, designStudio.currentViewIndex);
// 							designStudio.setImageBoxEvents(labelOrSealItem);
// 							designStudio.renderTextBoxesOnImageOnly(labelOrSealItem, designStudio.currentViewIndex);
// 							designStudio.setTextEvents(labelOrSealItem);
// 						});
// 					}
// 				} else {
// 					designStudio.renderViews(labelOrSealItem);
// 					designStudio.renderMainImage(labelOrSealItem, labelOrSealItem.getFirstVisibleViewIndex(), designStudio.handleMainImageChange);
// 					designStudio.renderImageBoxesOnImageOnly(labelOrSealItem, designStudio.currentViewIndex);
// 					designStudio.setImageBoxEvents(labelOrSealItem);
// 					designStudio.renderTextBoxesOnImageOnly(labelOrSealItem, designStudio.currentViewIndex);
// 					designStudio.setTextEvents(labelOrSealItem);
// 				}
// 			});
// 			//designStudio.currentDSItem.saveToIDS();
// 			//designStudio.renderViews(designStudio.currentDSItem);
// 			//designStudio.renderMainImage(designStudio.currentDSItem, designStudio.currentDSItem.getFirstVisibleViewIndex(), designStudio.handleMainImageChange);
// 		});
// 		//dsi.forceReload = true;
// 		//designStudio.loadItem(designStudio.dsJSON.documentList.length - 1);

// 	})
// 	.fail(function(data) {
// 		if (rerunGetDSSession) {
// 			user.sessionId = null;
// 			new_loadDOL(user, dolJSON, dsCallback);
// 		}
// 		rerunGetDSSession = false;
// 	});

// 	this.isModified = true;
// 	this.updateIDSObject();
// };

// DesignStudioItem.prototype.handleDesignDesignSelectionChange = function (selectedEnvelopeDesignId) {
// 	let selectedEnvelopeAttribute,
// 		dsi = this;

// 	$j('.designEnvelopeContainer').each(function(){
// 		$j(this).removeClass('selected');
// 	});

// 	designStudio.clearTextAndImageBoxesForItem(dsi);

// 	const isIDSMainImage = designStudio.isIDSMainImage();

// 	designStudio.lockInterfaceAndShowProgressSpinner();
// 	//designStudio.addLoadingAnimation('.dsDesignViews .singleView');
// 	//designStudio.addLoadingAnimation('.dsArtboard .mainImage');

// 	const selectedDesignAttribute = this.getAttributeById(selectedEnvelopeDesignId);
// 	this.envelopeAttribute = selectedDesignAttribute;

// 	if(!_.isNull(selectedDesignAttribute) && !_.isUndefined(selectedDesignAttribute)){
// 		this.templateStylecode = selectedDesignAttribute.template;
// 		designStudio.dsJSON.documentList[designStudio.dsJSON.documentList.length - 1].templateStylecode = selectedDesignAttribute.template;

// 	}

// 	let newGetDOLUrl = '/ids/setupSession?';

// 	newGetDOLUrl += "sessionId=" + encodeURIComponent(designStudio.user.sessionId);
// 	newGetDOLUrl += "&documentId=NEW-DOCUMENT-FROM-TEMPLATE";
// 	newGetDOLUrl += "&templateId=" + this.templateStylecode;
// 	newGetDOLUrl += "&r=" + Math.floor(Math.random()*11111);

// 	$j.get(newGetDOLUrl, function( data ) {
// 		var dolSessionId = data.description.split(":")[0],
// 			dolDocumentIdString = data.description.split(":")[1],
// 			productIdList = {},
// 			productList = {},
// 			encodedColorPalette = '';

// 		designStudio.updateDocumentListDocumentId(dsi, dolDocumentIdString);
// 		dsi.documentId = dolDocumentIdString;

// 		var encodedColorPalette = dsi.getEncodedColorPalette();
// 		dsi.colorPalette = encodedColorPalette;

// 		let skipImageRender = (this.isLockedForImprintEditing) ? 'true' : 'false',
// 			productViewString = dsi.getProductDSViewSetString(),
// 			envelopeItem = designStudio.getEnvelopeInEditing(),
// 			envelopeMailingServiceItem = designStudio.getEnvelopeMailingServiceItem();

// 		if(!_.isNull(envelopeItem) && !_.isUndefined(envelopeItem) && envelopeItem.isMultidocument){
// 			productViewString = envelopeItem.getProductDSViewSetString();
// 		} else if(!_.isNull(envelopeMailingServiceItem) && !_.isUndefined(envelopeMailingServiceItem) && envelopeMailingServiceItem.isMultidocument){
// 			productViewString = envelopeMailingServiceItem.getProductDSViewSetString();
// 		}

// 		const imprintData = dsi.getAddressTagTextForDefaultImprintData();
// 		let idsURL = designStudio.baseIDSLocation + 'getDocument?sessionId=' + dsi.sessionId + '&documentId=' + dsi.documentId + '&viewList=' + productViewString + '&sceneSpecificViewTagPrefix=' + dsi.typeCode + '&templateId=' + dsi.templateStylecode + '&skipImageRender=' + skipImageRender + '&initialColorPalette=' + ((dsi.isForKraftEnvelope())? 's:monochrome-for-kraft:' : ((dsi.colorPalette !== undefined && dsi.colorPalette !== null && dsi.colorPalette !== '')? dsi.colorPalette : null)) + imprintData + '&r=' + Math.random() + ':' + new Date().getTime();

// 		if(skipImageRender != 'false' && this.colorPalette !== undefined && this.colorPalette !== null && this.colorPalette !== '' && (this.colorPalette.toLowerCase().indexOf('foil') > 0 || this.colorPalette.toLowerCase().indexOf('varnish') > 0)){
// 			idsURL += '&exportOverprintMasks=true';
// 		}

// 		const variation = this.getSelectedVariationAttribute();
// 		if(!_.isNull(variation) && !_.isUndefined(variation)){
// 			idsURL += '&variation=' + variation.template;
// 		}

// 		$j.ajax({
// 			url: idsURL
// 		})
// 		.done(function(data) {
// 			dsi.colorSwatches = [];
// 			dsi.textBoxes = [];
// 			dsi.imageBoxes = [];
// 			dsi.updateFromIDS(data);
// 			dsi.updateViews();
// 			dsi.recalcProofingViews();
// 			dsi.updateSelectedAttributes();

// 			const envItem = designStudio.getEnvelopeInEditing(),
// 				designItem = designStudio.getSelectedDesignForEnvelopeItem(envItem);

// 			$j('#designSelectedContainer').html(designStudio.getSelectedDesignHTML(designItem, designItem));

// 			designStudio.setEnvelopeAddressingEvents(designItem);

// 			designItem.saveToIDS('ALL', function(){
// 				if(isIDSMainImage){

// 					var envItem = designStudio.getEnvelopeInEditing(),
// 						designItem = designStudio.getSelectedDesignForEnvelopeItem(envItem),
// 						envelopeMailingServiceItem = designStudio.getEnvelopeMailingServiceItem();

// 					if(!_.isNull(envItem)){
// 						envItem.renderMultidocumentViews(function(){
// 							envItem.updateMultidocumentViews();
// 							designStudio.updateMainImage(envItem);
// 							designStudio.updateViews(envItem);
// 							designStudio.renderImageBoxesOnImageOnly(designItem, designStudio.currentViewIndex);
// 							designStudio.setImageBoxEvents(designItem);
// 							designStudio.renderTextBoxesOnImageOnly(designItem, designStudio.currentViewIndex);
// 							designStudio.setTextEvents(designItem);
// 						});
// 					} else if(!_.isNull(envelopeMailingServiceItem)){
// 						envelopeMailingServiceItem.renderMultidocumentViews(function(){
// 							envelopeMailingServiceItem.updateMultidocumentViews();
// 							designStudio.updateMainImage(envelopeMailingServiceItem);
// 							designStudio.updateViews(envelopeMailingServiceItem);
// 							designStudio.renderImageBoxesOnImageOnly(designItem, designStudio.currentViewIndex);
// 							designStudio.setImageBoxEvents(designItem);
// 							designStudio.renderTextBoxesOnImageOnly(designItem, designStudio.currentViewIndex);
// 							designStudio.setTextEvents(designItem);
// 						});
// 					}
// 				} else {
// 					designStudio.renderViews(designItem);
// 					designStudio.renderMainImage(designItem, designItem.getFirstVisibleViewIndex(), designStudio.handleMainImageChange);
// 					designStudio.renderImageBoxesOnImageOnly(designItem, designStudio.currentViewIndex);
// 					designStudio.setImageBoxEvents(designItem);
// 					designStudio.renderTextBoxesOnImageOnly(designItem, designStudio.currentViewIndex);
// 					designStudio.setTextEvents(designItem);
// 				}

// 				designStudio.loadMailingListsForItem(designItem);
// 				if (designStudio.hasItemThatCanHaveShippingService() || designStudio.hasItemThatCanHaveMailingList()) {
// 					const listSubStep = designStudio.navigation.getMailingListNavSubStep();
// 					listSubStep.isAvailable = true;
// 					listSubStep.isVisible = true;
// 				}
// 				designStudio.navigation.updateNavigationCurrentState(designStudio.navigation.currentSubStep);
// 			});
// 			//designStudio.currentDSItem.saveToIDS();
// 			//designStudio.renderViews(designStudio.currentDSItem);
// 			//designStudio.renderMainImage(designStudio.currentDSItem, designStudio.currentDSItem.getFirstVisibleViewIndex(), designStudio.handleMainImageChange);
// 		});
// 		//dsi.forceReload = true;
// 		//designStudio.loadItem(designStudio.dsJSON.documentList.length - 1);
// 	})
// 	.fail(function(data) {
// 		if (rerunGetDSSession) {
// 			user.sessionId = null;
// 			new_loadDOL(user, dolJSON, dsCallback);
// 		}
// 		rerunGetDSSession = false;
// 	});

// 	this.isModified = true;
// 	this.updateIDSObject();
// };

// /***************/
// /*** Helpers ***/
// /***************/
// DesignStudioItem.prototype.getBoxPosition = function (dsItemBoxName, limitToCurrentView) {
// 	//Return object of top, left, bottom, right, height, width, points
// 	if(limitToCurrentView === undefined) limitToCurrentView = true;

// 	let dsItemViewData, top, left, bottom, right, height, width,
// 	editingTopDiff, editingLeftDiff, editingBottomDiff, editingRightDiff, editingHeightDiff, editingWidthDiff,
// 	points, editingPoints, centerPoint, documentCenterPoint, perspectiveTransformRotationAngle;

// 	dsItemViewData = this.getViewDataByName(dsItemBoxName, limitToCurrentView);
// 	dsItemView = designStudio.currentDSItem.views[designStudio.currentViewIndex];
// 	if (dsItemView && dsItemViewData !== null) {
// 		if(!_.isNull(dsItemView.sceneName) && !_.isUndefined(dsItemView.sceneName) && dsItemView.sceneName.indexOf('bleed') > -1){
// 			height = dsItemViewData.getEditingHeight();
// 			width = dsItemViewData.getEditingWidth();
// 			editingHeightDiff = dsItemViewData.getEditingHeight() - dsItemViewData.getHeight();
// 			editingWidthDiff = dsItemViewData.getEditingWidth() - dsItemViewData.getWidth();

// 			top = dsItemViewData.getTop();
// 			editingTopDiff = dsItemViewData.getEditingTop() - dsItemViewData.getTop();
// 			if(top <= 0){
// 				bottom = dsItemViewData.getEditingBottom() + Math.abs(dsItemViewData.getEditingTop());
// 				editingBottomDiff = dsItemViewData.getEditingBottom() - (dsItemViewData.getEditingBottom() + Math.abs(dsItemViewData.getEditingTop()));
// 			} else {
// 				top = top + 25;
// 				editingTopDiff = dsItemViewData.getEditingTop() - top;
// 				bottom = dsItemViewData.getBottom();
// 				editingBottomDiff = dsItemViewData.getEditingBottom();
// 			}

// 			left = dsItemViewData.getLeft();
// 			editingLeftDiff = dsItemViewData.getEditingLeft() - dsItemViewData.getLeft();
// 			if(left <= 0){
// 				right = dsItemViewData.getEditingRight() + Math.abs(dsItemViewData.getEditingLeft());
// 				editingRightDiff = dsItemViewData.getEditingRight() - (dsItemViewData.getEditingRight() + Math.abs(dsItemViewData.getEditingLeft()));
// 			} else {
// 				left = left + 25;
// 				editingLeftDiff = dsItemViewData.getEditingLeft() - left;
// 				right = dsItemViewData.getRight() + 25;
// 				editingRightDiff = dsItemViewData.getEditingRight() - editingWidthDiff;
// 			}

// 			points = dsItemViewData.getBleedPoints();
// 			editingPoints = dsItemViewData.getBleedEditingPoints();
// 			const dataCenterPoint = dsItemViewData.centerPoint;
// 			centerPoint = new Object();
// 			centerPoint.x = dataCenterPoint.x + editingWidthDiff;
// 			centerPoint.y = dataCenterPoint.y + editingHeightDiff;
// 			if(editingLeftDiff < 0 && left > 0){
// 				centerPoint.x = centerPoint.x + Math.abs(editingLeftDiff);
// 			}
// 			if(editingTopDiff < 0 && top > 0){
// 				centerPoint.y = centerPoint.y + Math.abs(editingTopDiff);
// 			}

// 			documentCenterPoint = dsItemViewData.documentCenterPoint;
// 			perspectiveTransformRotationAngle = dsItemViewData.perspectiveTransformRotationAngle;

// 		} else {
// 			top = dsItemViewData.getTop();
// 			bottom = dsItemViewData.getBottom();
// 			left = dsItemViewData.getLeft();
// 			right = dsItemViewData.getRight();
// 			height = dsItemViewData.getHeight();
// 			width = dsItemViewData.getWidth();
// 			editingTopDiff = dsItemViewData.getEditingTop() - dsItemViewData.getTop();
// 			editingBottomDiff = dsItemViewData.getEditingBottom() - dsItemViewData.getBottom();
// 			editingLeftDiff = dsItemViewData.getEditingLeft() - dsItemViewData.getLeft();
// 			editingRightDiff = dsItemViewData.getEditingRight() - dsItemViewData.getRight();
// 			editingHeightDiff = dsItemViewData.getEditingHeight() - dsItemViewData.getHeight();
// 			editingWidthDiff = dsItemViewData.getEditingWidth() - dsItemViewData.getWidth();
// 			points = dsItemViewData.getPoints();
// 			editingPoints = dsItemViewData.getEditingPoints();
// 			centerPoint = dsItemViewData.centerPoint;
// 			documentCenterPoint = dsItemViewData.documentCenterPoint;
// 			perspectiveTransformRotationAngle = dsItemViewData.perspectiveTransformRotationAngle;
// 		}
// 	}
// 	return {'top' : top,
// 			'left' : left,
// 			'bottom' : bottom,
// 			'right' : right,
// 			'height' : height,
// 			'width' : width,
// 			'editingTopDiff' : editingTopDiff,
// 			'editingBottomDiff' : editingBottomDiff,
// 			'editingLeftDiff' : editingLeftDiff,
// 			'editingRightDiff' : editingRightDiff,
// 			'editingHeightDiff' : editingHeightDiff,
// 			'editingWidthDiff' : editingWidthDiff,
// 			'points' : points,
// 			'editingPoints' : editingPoints,
// 			'centerPoint' : centerPoint,
// 			'documentCenterPoint' : documentCenterPoint,
// 			'perspectiveTransformRotationAngle' : perspectiveTransformRotationAngle}
// };

// DesignStudioItem.prototype.getBoxRelativePositionTop = function (dsItemBoxName) {
// 	let dsItemViewData, top;

// 	dsItemViewData = this.getViewDataByName(dsItemBoxName);
// 	if (dsItemViewData !== null) {
// 		top = dsItemViewData.getTop();
// 	}
// 	return top;
// };

// DesignStudioItem.prototype.getBoxRelativePositionBottom = function (dsItemBoxName) {
// 	let dsItemViewData, bottom;

// 	dsItemViewData = this.getViewDataByName(dsItemBoxName);
// 	if (dsItemViewData !== null) {
// 		bottom = dsItemViewData.getBottom();
// 	}
// 	return bottom;
// };

// DesignStudioItem.prototype.getBoxRelativePositionLeft = function (dsItemBoxName) {
// 	let dsItemViewData, left;

// 	dsItemViewData = this.getViewDataByName(dsItemBoxName);
// 	if (dsItemViewData !== null) {
// 		left = dsItemViewData.getLeft();
// 	}
// 	return left;
// };

// DesignStudioItem.prototype.getBoxRelativePositionRight = function (dsItemBoxName) {
// 	let dsItemViewData, right;

// 	dsItemViewData = this.getViewDataByName(dsItemBoxName);
// 	if (dsItemViewData !== null) {
// 		right = dsItemViewData.getRight();
// 	}
// 	return right;
// 	//return (100 * (1 - (rightCoord/this.IDSObject.pageWidth)));
// };

// DesignStudioItem.prototype.getBoxRelativeHeight = function (dsItemBoxName) {
// 	let dsItemViewData, height;

// 	dsItemViewData = this.getViewDataByName(dsItemBoxName);
// 	if (dsItemViewData !== null) {
// 		height = dsItemViewData.getHeight();
// 	}
// 	return height;
// 	//return (100 * (leftCoord/this.IDSObject.pageWidth));
// };

// DesignStudioItem.prototype.getBoxRelativeWidth = function (dsItemBoxName) {
// 	let dsItemViewData, width;

// 	dsItemViewData = this.getViewDataByName(dsItemBoxName);
// 	if (dsItemViewData !== null) {
// 		width = dsItemViewData.getWidth();
// 	}
// 	return width;
// };

// DesignStudioItem.prototype.getBoxPoints = function (dsItemBoxName) {
// 	let dsItemViewData, points;

// 	dsItemViewData = this.getViewDataByName(dsItemBoxName);
// 	if (dsItemViewData !== null) {
// 		points = dsItemViewData.getPoints();
// 	}
// 	return points;
// };

// DesignStudioItem.prototype.getBoxEditingPoints = function (dsItemBoxName) {
// 	let dsItemViewData, points;

// 	dsItemViewData = this.getViewDataByName(dsItemBoxName);
// 	if (dsItemViewData !== null) {
// 		points = dsItemViewData.getEditingPoints();
// 	}
// 	return points;
// };

// DesignStudioItem.prototype.getBoxRelativeRotation = function (rotationAngle) {
// 	return (-1 * rotationAngle);
// };

// DesignStudioItem.prototype.getViewDataByName = function (name, limitToCurrentView) {
// 	var dsItemViewData = null, tempDSItemViewData, tempDSItemViewBounds, tempDSItemViewBounds;
// 	limitToCurrentView = limitToCurrentView || false;
// 	for (let i = 0, x = this.views.length; i < x; i = i + 1) {
// 		tempDSItemViewData = this.views[i].viewData;
// 		if (dsItemViewData === null) {
// 			for (let j = 0, y = tempDSItemViewData.length; j < y; j = j + 1) {
// 				if ((!limitToCurrentView && tempDSItemViewData[j].name == name) || (limitToCurrentView && i === designStudio.currentViewIndex && tempDSItemViewData[j].name == name)) {
// 					dsItemViewData = tempDSItemViewData[j];
// 					break;
// 				}
// 			}
// 		}
// 	}

// 	return dsItemViewData;
// };

// DesignStudioItem.prototype.getProductDSViewSetString = function () {
// 	let productDSViewSetStr = '', productDSViewSet;

// 	productDSViewSet = this.productDSViewSet;
// 	if (notNullOrZeroLength(productDSViewSet)) {
// 		for (let i = 0, x = productDSViewSet.length; i < x; i = i + 1) {
// 			if ((productDSViewSetStr.indexOf(',') > 0 && productDSViewSetStr.indexOf(productDSViewSet[i].scene + ',') < 0) || (productDSViewSetStr.indexOf(',' ) < 0 && productDSViewSetStr !== productDSViewSet[i].scene)) {
// 				productDSViewSetStr = (productDSViewSetStr !== '')? productDSViewSetStr + ',' : productDSViewSetStr;
// 				productDSViewSetStr += productDSViewSet[i].scene;
// 			}
// 		}
// 	}

// 	return productDSViewSetStr;
// };

// DesignStudioItem.prototype.getProductNonDSViewSetString = function () {
// 	let productViewSetStr = '', productViewSet;

// 	productViewSet = this.productViewSet;
// 	if (notNullOrZeroLength(productViewSet)) {
// 		for (let i = 0, x = productViewSet.length; i < x; i = i + 1) {
// 			if ((productViewSetStr.indexOf(',') > 0 && productViewSetStr.indexOf(productViewSet[i].scene + ',') < 0) || (productViewSetStr.indexOf(',' ) < 0 && productViewSetStr !== productViewSet[i].scene)) {
// 				productViewSetStr = (productViewSetStr !== '')? productViewSetStr + ',' : productViewSetStr;
// 				productViewSetStr += productViewSet[i].scene;
// 			}
// 		}
// 	}

// 	return productViewSetStr;
// };

// DesignStudioItem.prototype.getAllViewSetString = function () {
// 	let productViewSetStr = '', productDSViewSet, productViewSet;

// 	productDSViewSet = this.productDSViewSet;
// 	if (notNullOrZeroLength(productDSViewSet)) {
// 		for (var i = 0, x = productDSViewSet.length; i < x; i = i + 1) {
// 			if ((productViewSetStr.indexOf(',') > 0 && productViewSetStr.indexOf(productDSViewSet[i].scene + ',') < 0) || (productViewSetStr.indexOf(',' ) < 0 && productViewSetStr !== productDSViewSet[i].scene)) {
// 				productViewSetStr = (productViewSetStr !== '')? productViewSetStr + ',' : productViewSetStr;
// 				productViewSetStr += productDSViewSet[i].scene;
// 			}
// 		}
// 	}
// 	productViewSet = this.productViewSet;
// 	if (notNullOrZeroLength(productViewSet)) {
// 		for (var i = 0, x = productViewSet.length; i < x; i = i + 1) {
// 			if ((productViewSetStr.indexOf(',') > 0 && productViewSetStr.indexOf(productViewSet[i].scene + ',') < 0) || (productViewSetStr.indexOf(',' ) < 0 && productViewSetStr !== productViewSet[i].scene)) {
// 				productViewSetStr = (productViewSetStr !== '')? productViewSetStr + ',' : productViewSetStr;
// 				productViewSetStr += productViewSet[i].scene;
// 			}
// 		}
// 	}

// 	if(this.isForEnvelope()){
// 		const envelopeItem = designStudio.getEnvelopeInEditing();
// 		if(!_.isNull(envelopeItem) && !_.isUndefined(envelopeItem) && envelopeItem.isMultidocument){
// 			productViewSetStr = (productViewSetStr !== '')? productViewSetStr + ',' : productViewSetStr;
// 			productViewSetStr += envelopeItem.getProductDSViewSetString();
// 		}
// 	}

// 	return productViewSetStr;
// };

// DesignStudioItem.prototype.isDS = function () {
// 	if (this.itemType.toUpperCase() === 'DOL') {
// 		return true;
// 	} else {
// 		return false;
// 	}
// };

// DesignStudioItem.prototype.imprintFormRequired = function () {
// 	if (this.templateStylecode.toUpperCase().indexOf('WS') === 0) {
// 		const savedData = getTableGroupsData_visitorData();
// 		return (savedData && notNullOrEmpty(savedData.data));
// 	}
// 	return false;
// };

// DesignStudioItem.prototype.useDesignerTool = function () {
// 	const isB2BMarket = (designStudio.dsJSON.marketId === 0),
// 		notEnvelopeAndNotForEnvelope = (!this.isEnvelope() && !this.isForEnvelope()),
// 		isEnvelopeAndNoDsItemsCanHaveShippingServiceOrMailingList = (!designStudio.hasItemThatCanHaveShippingService() && !designStudio.hasItemThatCanHaveMailingList() && this.isEnvelope()),
// 		isDsItemButNotEnvelopeAndNotForEnvelopeAndNotENVRWithEnvelope = (this.isDS() && notEnvelopeAndNotForEnvelope && !this.isENVRWithEnvelope()),
// 		notPostageAndNotMailingService = !this.isMailingService() && !this.isPostage(),
// 		isOnlyDsItemAndIsForEnvelope = (designStudio.dsItems.length == 1 && this.isForEnvelope());

// 	if ((isB2BMarket &&
// 		 (isDsItemButNotEnvelopeAndNotForEnvelopeAndNotENVRWithEnvelope || isEnvelopeAndNoDsItemsCanHaveShippingServiceOrMailingList || isOnlyDsItemAndIsForEnvelope) &&
// 		 notPostageAndNotMailingService)
// 			||
// 		(!isB2BMarket &&
// 		 !this.isShippingService &&
// 		 (designStudio.dsItems.length == 1 || this.isEnvelope() || notEnvelopeAndNotForEnvelope))) {

// 		return true;
// 	} else {
// 		return false;
// 	}
// };

// DesignStudioItem.prototype.hasColorSelectionImprint = function () {
// 	if (this.getSelectionImprints().length > 0) {
// 		return true;
// 	} else {
// 		return false;
// 	}
// };

// DesignStudioItem.prototype.getSelectionImprints = function () {
// 	let imprintSelectionImprints = [],
// 		imprintData;
// 	if (notNull(this.imprintData)) {
// 		for (let i = 0, x = this.imprintData.length; i < x; i = i + 1) {
// 			imprintData = this.imprintData[i];
// 			if (imprintData.type.toUpperCase() === 'SELECTION' && imprintData.name.indexOf('Color') > -1) {
// 				imprintSelectionImprints.push(imprintData);
// 			} else if (imprintData.type.toUpperCase() === 'SELECTION' && imprintData.name.indexOf('Font') > -1) {
// 				imprintSelectionImprints.push(imprintData);
// 			}
// 		}
// 	}
// 	return imprintSelectionImprints;
// };

// DesignStudioItem.prototype.getCurrentImprintSelection = function () {
// 	let imprintSelection,
// 		imprintData, imprintOptions;
// 	if (notNull(this.imprintData)) {
// 		for (let i = 0, x = this.imprintData.length; i < x; i = i + 1) {
// 			imprintData = this.imprintData[i];
// 			if (imprintData.type.toUpperCase() === 'SELECTION' && imprintData.name.indexOf('Color') > -1) {
// 				imprintOptions = imprintData.options;
// 				for (var j = 0, y = imprintOptions.length; j < y; j = j + 1) {
// 					if (imprintOptions[j].selected === true) {
// 						imprintSelection = imprintOptions[j];
// 					}
// 				}
// 			} else if (imprintData.type.toUpperCase() === 'SELECTION' && imprintData.name.indexOf('Font') > -1) {
// 				imprintOptions = imprintData.options;
// 				for (var j = 0, y = imprintOptions.length; j < y; j = j + 1) {
// 					if (imprintOptions[j].selected === true) {
// 						imprintSelection = imprintOptions[j];
// 					}
// 				}
// 			}
// 		}
// 	}
// 	return imprintSelection;
// };

// DesignStudioItem.prototype.hasImprintSelection = function () {
// 	let hasImprintSelection = false;
// 	if (notNullOrEmpty(this.getCurrentImprintSelection())) {
// 		hasImprintSelection = true;
// 	}
// 	return hasImprintSelection;
// };

// DesignStudioItem.prototype.updateSpecialDesignRequest = function(request) {
// 	this.userDesignNotes = request || '';
// 	this.unapproveItem();
// };

// /*** Color Palette ***/
// DesignStudioItem.prototype.generatePaletteForEncoding = function() {
// 	const swatchList = this.originalColors;

// 	for (let i = 0; i < this.originalColors.length; i = i + 1) {
// 		colorAdded = false;
// 		for (let j = 0; j < this.colorSwatches.length; j = j + 1) {
// 			if (this.colorSwatches[j] !== undefined && this.colorSwatches[j] !== null && this.colorSwatches[j].colorSpace.toUpperCase() !== 'SPOT' && this.colorSwatches[j].id === this.originalColors[i].inDesignSwatchId) {
// 				swatchList[i].updatedCMYK = this.colorSwatches[j].getCMYK();
// 				colorAdded = true;
// 				break;
// 			}
// 		}
// 		if (!colorAdded) {
// 			swatchList[i].updatedCMYK = this.originalColors[i].cmyk;
// 		}
// 	}
// 	return swatchList;
// };

// DesignStudioItem.prototype.getEncodedColorPalette = function() {
// 	let encodedColors = '';
// 	if (notNullOrEmpty(this.colorSwatches) && notNullOrEmpty(this.originalColors)) {
// 		encodedColors = encodePalette(this.generatePaletteForEncoding());
// 	}
// 	return encodedColors;
// };

// DesignStudioItem.prototype.getEncodedColorPaletteWithFoil = function() {
// 	let encodedColors = '';
// 	if (notNullOrEmpty(this.colorSwatches) && notNullOrEmpty(this.originalColors)) {
// 		encodedColors = encodePalette(this.generatePaletteForEncoding());
// 	}
// 	const foilAttribute = this.getSelectedFoilAttribute();
// 	if(!_.isNull(foilAttribute) && !_.isUndefined(foilAttribute)){
// 		if(encodedColors === ''){
// 			encodedColors = 'i::';
// 		}
// 		encodedColors += ':foilColor=' + foilAttribute.webDescription.replace(' ', '').toLowerCase() + ':';
// 	}
// 	const varnishAttribute = this.getSelectedVarnishAttribute();
// 	if(!_.isNull(varnishAttribute) && !_.isUndefined(varnishAttribute)){
// 		if(encodedColors === ''){
// 			encodedColors = 'i::';
// 		}
// 		encodedColors += ':displayVarnish=true:';
// 	}
// 	return encodedColors;
// };

// DesignStudioItem.prototype.approveItem = function() {
// 	let documentList;
// 	documentList = designStudio.dsJSON.documentList;
// 	for (let i = 0, x = documentList.length; i < x; i = i + 1) {
// 		if (designStudio.dsJSON.documentList[i].documentId === this.documentId) {
// 			designStudio.dsJSON.documentList[i].userApprovalInitials = 'yes';
// 		}
// 	}

// 	this.approved = true;
// 	this.userDesignNotes = '';
// 	this.isSaved = false;
// };

// DesignStudioItem.prototype.unapproveItem = function() {
// 	let documentList;
// 	documentList = designStudio.dsJSON.documentList;
// 	for (let i = 0, x = documentList.length; i < x; i = i + 1) {
// 		if (designStudio.dsJSON.documentList[i].documentId === this.documentId) {
// 			designStudio.dsJSON.documentList[i].userApprovalInitials = '';
// 		}
// 	}

// 	this.approved = false;
// 	this.isSaved = false;
// };

// DesignStudioItem.prototype.isApprovedItem = function() {
// 	let documentList,
// 		isApproved = false;
// 	documentList = designStudio.dsJSON.documentList;
// 	for (let i = 0, x = documentList.length; i < x; i = i + 1) {
// 		if (designStudio.dsJSON.documentList[i].documentId === this.documentId) {
// 			isApproved = (this.approved || (designStudio.dsJSON.documentList[i].userApprovalInitials == 'yes'));
// 		}
// 	}
// 	return isApproved;
// };

// DesignStudioItem.prototype.isGuestAddressPrinting = function() {
// 	return (this.productType.toLowerCase().indexOf('guest') > -1 && this.productType.toLowerCase().indexOf('address') > -1);
// };

// /*** Errors ***/
// DesignStudioItem.prototype.updateItemErrors = function() {
// 	let allErrors = [];

// 	const textBoxErrorsObj = this.getTextBoxErrors()
// 	if(textBoxErrorsObj) allErrors = allErrors.concat(textBoxErrorsObj);

// 	const imageBoxErrorsObj = this.getImageBoxErrors();
// 	if(imageBoxErrorsObj) allErrors = allErrors.concat(imageBoxErrorsObj);

// 	if(this.trackUneditedElements){
// 		const uneditedTextErrorsObj = this.getUneditedTextErrors();
// 		if(uneditedTextErrorsObj) allErrors = allErrors.concat(uneditedTextErrorsObj);

// 		const uneditedImageErrorsObj = this.getUneditedImageErrors();
// 		if(uneditedImageErrorsObj) allErrors = allErrors.concat(uneditedImageErrorsObj);
// 	}

// 	this.itemErrors = allErrors;
// };

// DesignStudioItem.prototype.getTextBoxErrors = function() {
// 	const textErrors = [];
// 	if(this.textBoxes && this.textBoxes.length > 0){
// 		for(let i = 0; i < this.textBoxes.length; i++){
// 			const textBox = this.textBoxes[i];
// 			if(textBox.errors && textBox.errors.length > 0){
// 				for(let j = 0; j < textBox.errors.length; j++){
// 					const error = {};
// 					error[textBox.name] = textBox.errors[j];
// 					textErrors.push(error);
// 				}
// 			}
// 		}
// 	}
// 	return textErrors;
// }

// DesignStudioItem.prototype.getImageBoxErrors = function() {
// 	const uneditedImageErrors = [];
// 	if(this.imageBoxes && this.imageBoxes.length > 0){
// 		for(let i = 0; i < this.imageBoxes.length; i++){
// 			const imageBox = this.imageBoxes[i];
// 			if(imageBox.errors && imageBox.errors.length > 0 && !imageBox.hidden){
// 				for(let j = 0; j < imageBox.errors.length; j++){
// 					const error = {};
// 					error[imageBox.name] = imageBox.errors[j];
// 					uneditedImageErrors.push(error);
// 				}
// 			}
// 		}
// 	}
// 	return uneditedImageErrors;
// }

// DesignStudioItem.prototype.getUneditedImageErrors = function() {
// 	const imageErrors = [];
// 	if(this.imageBoxes && this.imageBoxes.length > 0){
// 		for(let i = 0; i < this.imageBoxes.length; i++){
// 			const imageBox = this.imageBoxes[i];
// 			if(imageBox.needsToBeUpdated()){
// 				const errorName = imageBox.name,
// 					error = {};
// 				error[errorName] = imageNeedsUpdating_code
// 				imageErrors.push(error);
// 			}
// 		}
// 	}
// 	return imageErrors;
// }

// DesignStudioItem.prototype.getUneditedTextErrors = function() {
// 	const uneditedTextErrors = [];
// 	if(this.textBoxes && this.textBoxes.length > 0){
// 		for(let i = 0; i < this.textBoxes.length; i++){
// 			var textBox = this.textBoxes[i],
// 				error = textBox.getUneditedTextError();

// 			if(error != null){
// 				var errorName = textBox.name,
// 					errorDetail = error.label + (notNullOrEmpty(error.detailMsg) ? ' -> ' + error.detailMsg : ''),
// 					error = {};
// 				error[errorName] = errorDetail;
// 				uneditedTextErrors.push(error);
// 			}
// 		}
// 	}
// 	return uneditedTextErrors;
// };

// DesignStudioItem.prototype.recalculatePrice = function() {
// 	const dsi = this;
// 	dsi.isWorking = true;
// 	const productId = dsi.productId;

// 	$j.ajax({
// 		method: 'POST',
// 		url: '/getUnitPriceForProduct',
// 		data: {
// 			productId : productId,
// 			productQuantity : dsi.quantity
// 		}
// 	}).done(function(dataString) {
// 		const data = JSON.parse(dataString);
// 		if(data.unitPrice > 0){
// 			dsi.unitPrice = formatPrice(data.unitPrice, true);
// 			dsi.price = formatPrice(data.totalPrice, true);
// 		} else {
// 			dsi.unitPrice = 0;
// 			dsi.price = 0;
// 		}
// 		dsi.isWorking = false;
// 	}).fail(function(dataString) {
// 		console.log('Error: Failed to fetch product unit price');
// 	});
// };

// DesignStudioItem.prototype.highLevelTextColorEditingOnly = function() {
// 	return (this.isGuestAddress() || this.isReturnAddress() || this.isMailingService());
// };
// DesignStudioItem.prototype.getAllowedColorRange = function() {
// 	const lumaRange = {
// 			minLuma : null,
// 			maxLuma : null
// 	};
// 	if(this.isGuestAddress() || this.isReturnAddress() || this.isMailingService()){
// 		lumaRange.maxLuma = 140;
// 	}
// 	return lumaRange;
// };
// DesignStudioItem.prototype.getQRCodeColorRange = function() {
// 	const lumaRange = {
// 			minLuma : null,
// 			maxLuma : 140
// 	};
// 	return lumaRange;
// };
// DesignStudioItem.prototype.hasTextTag = function(tagName) {
// 	let hasTag = false;
// 	if(this.IDSObject && this.IDSObject.textTags){
// 		for(let i = 0; i < this.IDSObject.textTags.length && !hasTag; i++){
// 			if(this.IDSObject.textTags[i].name == tagName){
// 				hasTag = true;
// 			}
// 		}
// 	}
// 	return hasTag;
// };

// DesignStudioItem.prototype.isValidBeforeAdvance = function(tagName) {
// 	let isValid = true;

// 	//Validation Check #1: empty sports schedule image box(es)
// 	const emptyImageBoxes = this.getEmptyScheduleImageBoxes();
// 	if(emptyImageBoxes && emptyImageBoxes.length > 0){
// 		if(isNullOrEmpty(this.userDesignNotes)){
// 			HotTub.dialog.warningPopupWithText(
// 				'Choose Schedule',
// 				'<div class="textOnlyDialogContent">There '+(emptyImageBoxes.length > 1 ? 'are' : 'is')+' '+emptyImageBoxes.length+' team schedule'+(emptyImageBoxes.length > 1 ? 's' : '')+' that still need'+(emptyImageBoxes.length > 1 ? '' : 's')+' to be chosen. Click the button below to select the '+(emptyImageBoxes.length > 1 ? 'first one' : 'schedule')+', or close this dialog and click on the schedule you want to choose.</div>',
// 				true,
// 				'Close',
// 				HotTub.dialog.handleClose,
// 				'Choose Team',
// 				function(){
// 					HotTub.dialog.handleClose();
// 					emptyImageBoxes.sort(function(a,b){
// 						let pos1 = 0,
// 							pos2 = 0;
// 						try{
// 							pos1 = a.tagName.split('-')[1].replace('team','');
// 							pos2 = b.tagName.split('-')[1].replace('team','');
// 						}catch(e){
// 							//don't worry about order if the parse fails, just for convenience
// 						}
// 						return pos1 - pos2;
// 					});
// 					const imageBox = emptyImageBoxes[0];
// 					designStudio.currentEditingImageBox = imageBox;
// 					designStudio.currentEditingImageBoxPosition = designStudio.currentDSItem.getBoxPosition(imageBox.name);
// 					imageBox.handleImageClick();
// 				}
// 			);
// 			MSGA.designStudio3.productEditingNotCompletePrompt('Missing '+emptyImageBoxes.length+' schedules');
// 			isValid = false;
// 			return isValid;
// 		}
// 	}

// 	if(this.hasLegacyDateDrivenTextBox() && !this.haveExistingValidLegacyDesignRequestEventDate() && !allItemsAreSamples(designStudio.dsItems)){
// 		isValid = false;
// 		this.callClickHandlerForFirstLegacyDateDrivenTextBox();
// 		return isValid;

// 	} else if(this.hasDynamicDateDrivenTextBox() && !this.haveExistingValidDynamicEventDate() && !allItemsAreSamples(designStudio.dsItems)){
// 		isValid = false;
// 		this.callClickHandlerForFirstDynamicDateDrivenTextBox();
// 		return isValid;
// 	}

// 	/* Future validation checks that should stop advance can go here... */

// 	if(!_.isNull(this.itemErrors) && !_.isUndefined(this.itemErrors) && this.itemErrors.length > 0){
// 		let visibleErrors = 0;
// 		for(var i = 0, x = this.itemErrors.length; i < x; i = i + 1){
// 			var itemError = this.itemErrors[i];
// 			Object.keys(itemError).forEach(function(key) {
// 				if(!isHiddenFromUserErrorCode(itemError[key])){
// 					visibleErrors++;
// 				}
// 			});
// 		}

// 		if(visibleErrors > 0){
// 			if(is_999_Stylecode(this.productStylecode)){
// 				HotTub.dialog.infoPopupWithText("It looks like you have some errors on your design", "Please fix all errors before proceeding", true, "OK", function(){HotTub.dialog.handleClose();});
// 			} else {
// 				HotTub.dialog.infoPopupWithText("It looks like you have some errors on your design", "Are you sure you want to continue with errors?", true, "Continue", function(){HotTub.dialog.handleClose(); designStudio.navigation.defaultNextClickEvent();}, 'Close', function(){HotTub.dialog.handleClose();});
// 			}
// 			isValid = false;
// 			return isValid;
// 		}
// 	}

// 	if((this.hasFoilColor() || this.hasVarnish()) && singleQtyStylecodes.indexOf(this.typeCode) == -1 && this.quantity > 1 && this.quantity < 20){
// 		//Set quantity to closest to 20 available of all items
// 		designStudio.updateAllNonShippingServiceQuantities(20, true);
// 		HotTub.dialog.infoPopupWithText(((this.hasFoilColor())? 'Raised Foil': 'Spot Gloss') + " requires a minimum quantity of 20.", "Your items have been updated accordingly", true, "Continue", function(){HotTub.dialog.handleClose();});
// 	}

// 	const addressItemsToCheck = designStudio.getItemsThatCouldHaveReturnAddressOnEnvelope(this),
// 		itemNeedingUpdate = designStudio.getFirstItemAndTextBoxWithUneditedReturnAddress(addressItemsToCheck);

// 	if(isValid && itemNeedingUpdate){
// 		HotTub.dialog.infoPopupWithText(
// 			"Looks like your return address isn't updated",
// 			"<span class=\"compactCustomerModalContent\">" +
// 				"We don't know which name & return address you'd like to use, but we're pretty sure it's not:"+
// 				"<p class=\"addressExample\">" + itemNeedingUpdate.textBox.getPlainTextContentsWithNewLines().replaceAll('\n','<br/>') + "</p>"+
// 				"Please enter the correct address, or delete the above address text if you would like this area to be blank."+
// 			"</span>",
// 			true,
// 			"Close", function(){HotTub.dialog.handleClose();},
// 			"Update Address", function(){
// 				HotTub.dialog.handleClose();
// 				const returnAddressBoxId = DesignStudioItemText.prepareNameForDomElementID(itemNeedingUpdate.textBox.typeCode, itemNeedingUpdate.textBox.name);
// 				if($j('span#' + returnAddressBoxId).length > 0){
// 					$j('span#' + returnAddressBoxId).trigger('click');
// 				} else {
// 					$j('#' + returnAddressBoxId).trigger('mouseup');
// 				}
// 			}
// 		);
// 		isValid = false;
// 		return isValid;
// 	}

// 	const textBoxNeedingUpdate = designStudio.getFirstTextBoxWithTextThatShouldNeverBePrinted(this);
// 	if(isValid && textBoxNeedingUpdate){
// 		HotTub.dialog.infoPopupWithText(
// 			"Looks like some text isn't updated",
// 			"<span class=\"compactCustomerModalContent\">" +
// 				"We found some example text on this design that should never be printed:"+
// 				"<p class=\"addressExample\">" + textBoxNeedingUpdate.getPlainTextContentsWithNewLines().replaceAll('\n','<br/>') + "</p>"+
// 				"Please update or remove the above text before advancing."+
// 			"</span>",
// 			true,
// 			"Close", function(){HotTub.dialog.handleClose();},
// 			"Update Text", function(){
// 				HotTub.dialog.handleClose();
// 				const textBoxId = DesignStudioItemText.prepareNameForDomElementID(textBoxNeedingUpdate.typeCode, textBoxNeedingUpdate.name);
// 				if($j('span#' + textBoxId).length > 0){
// 					$j('span#' + textBoxId).trigger('click');
// 				} else {
// 					$j('#' + textBoxId).trigger('mouseup');
// 				}
// 			}
// 		);
// 		isValid = false;
// 		return isValid;
// 	}

// 	if(isValid && (designStudio.dsJSON.marketId === 517 || designStudio.dsJSON.marketId === 524) && this.quantity > 1 && this.useDesignerTool() /*&& (_.isNull(this.orderItemId) || _.isUndefined(this.orderItemId) || this.orderItemId == 'undefined')*/){
// 		if(this.textBoxes.length > 0 || this.imageBoxes.length > 0){
// 			const suspectTextBoxes = [];
// 			const suspectImageBoxes = [];
// 			for(var i = 0, x = this.textBoxes.length; i < x; i++){
// 				var textBox = this.textBoxes[i];
// 				if(!textBox.modified && !textBox.lockEditing && !textBox.isLegacyDateDrivenTextBox() && !textBox.isMonthTextBoxWithLegendCodes() && designStudio.safePhrases.indexOf(textBox.originalPlainText.toLowerCase()) < 0 && !textBox.isEmpty()){
// 					suspectTextBoxes.push(this.textBoxes[i]);
// 				}
// 			}
// 			for(var i = 0, x = this.imageBoxes.length; i < x; i++){
// 				var imageBox = this.imageBoxes[i];
// 				if(!imageBox.modified){
// 					suspectImageBoxes.push(this.imageBoxes[i]);
// 				}
// 			}

// 			if(suspectTextBoxes.length > 0 || suspectImageBoxes.length > 0){
// 				let popupContent = '<p>It looks like the following items weren\'t updated.</p><p>Would you like to change them?</p>';

// 				(suspectTextBoxes.length > 0)? popupContent += '<ul class="suspectItemsList"><li class="suspectHeading"><i class="fa fa-text-light "></i>Text</li>': '';
// 				for(var j = 0, y = suspectTextBoxes.length; j < y; j++){
// 					var textBox = suspectTextBoxes[j];
// 					var viewName = designStudio.getViewNameByElementId(designStudio.currentDSItem, textBox.name, true);
// 					popupContent += '<li><div class="suspectItemTextPreview">' + textBox.originalPlainText.substring(0, 30) + ((textBox.originalPlainText.length > 30)? '...' : '') + ((!_.isNull(viewName) && !_.isUndefined(viewName) && viewName != '')? ' (' + viewName + ')' : '') + '</div> <div class="button hollow suspectItemEditLink" id="' + designStudio.currentDSItem.typeCode + '__' + textBox.name + '_suspect_" onclick="HotTub.dialog.handleClose();designStudio.handleSuspectTextBoxClick(event);">Edit</div></li>';
// 				}
// 				popupContent += '</ul>';

// 				(suspectImageBoxes.length > 0)? popupContent += '<ul class="suspectItemsList"><li class="suspectHeading"><i class="fa fa-images-sharp-light"></i>Images</li>': '';
// 				for(var j = 0, y = suspectImageBoxes.length; j < y; j++){
// 					var imageBox = suspectImageBoxes[j];
// 					var viewName = designStudio.getViewNameByElementId(designStudio.currentDSItem, imageBox.name, true);
// 					if(imageBox.label.indexOf('Symbol') < 0){
// 						popupContent += '<li>' + imageBox.label + ((!_.isNull(viewName) && !_.isUndefined(viewName) && viewName != '')? ' (' + viewName + ')' : '') + ' <div class="button hollow suspectItemEditLink" id="suspect_' + DesignStudioItemImage.prepareNameForDomElementID(imageBox.typeCode, imageBox.getId(), imageBox.name) + '" onclick="HotTub.dialog.handleClose();designStudio.handleSuspectImageBoxClick(event);">Edit</div></li>';
// 					}
// 				}
// 				popupContent += '</ul>';

// 				HotTub.dialog.infoPopupWithText("Just checking...", popupContent, true, "Close", function(){HotTub.dialog.handleClose();}, "Continue", function(){
// 					HotTub.dialog.handleClose();
// 					if(!designStudio.currentDSItem.hasFoilColor() && designStudio.currentDSItem.allowFoil()){
// 						designStudio.currentDSItem.getAnimatedUpsell();
// 					} else {
// 						designStudio.navigation.defaultNextClickEvent();
// 					}
// 				});
// 				isValid = false;
// 				return isValid;
// 			}
// 		}

// 		if(!designStudio.currentDSItem.hasFoilColor() && designStudio.currentDSItem.allowFoil()){
// 			designStudio.currentDSItem.getAnimatedUpsell();
// 			isValid = false;
// 			return isValid;
// 		}
// 	}

// 	return isValid;
// };

// DesignStudioItem.prototype.getEmptyScheduleImageBoxes = function(tagName) {
// 	let emptySchedules = null;
// 	if(this.imageBoxes){
// 		for(let i = 0; i < this.imageBoxes.length; i++){
// 			if(this.imageBoxes[i].isEmptySchedule()){
// 				if(!emptySchedules) emptySchedules = [];
// 				emptySchedules.push(this.imageBoxes[i]);
// 			}
// 		}
// 	}
// 	return emptySchedules;
// };

// DesignStudioItem.prototype.allowFoil = function() {
// 	if(!_.isNull(this.availableAttributes.foil) && !_.isUndefined(this.availableAttributes.foil) && this.availableAttributes.foil.length > 0){
// 		return true;
// 	} else {
// 		return false;
// 	}
// };

// DesignStudioItem.prototype.allowSubstrates = function() {
// 	if(!_.isNull(this.availableAttributes.substrates) && !_.isUndefined(this.availableAttributes.substrates) && this.availableAttributes.substrates.length > 0){
// 		return true;
// 	} else {
// 		return false;
// 	}
// };

// DesignStudioItem.prototype.getFoilCost = function() {
// 	let foilCost = 0;
// 	if(!_.isNull(this.availableAttributes.foil) && !_.isUndefined(this.availableAttributes.foil) && this.availableAttributes.foil.length > 0){
// 		foilCost = (this.availableAttributes.foil[0].perPiecePrice * this.quantity).toFixed(2);

// 		if(!_.isNull(designStudio.dsJSON.discounts) && !_.isUndefined(designStudio.dsJSON.discounts) && designStudio.dsJSON.discounts.length > 0){
// 			for(let i = 0, x = designStudio.dsJSON.discounts.length; i < x; i = i + 1){
// 				let discount = designStudio.dsJSON.discounts[i],
// 					attributeIds = [];
// 				if(!_.isNull(discount.attributeIdList) && !_.isUndefined(discount.attributeIdList) && discount.attributeIdList != ''){
// 					attributeIds = discount.attributeIdList.split(',');
// 					for(let j = 0, y = attributeIds.length; j < y; j = j + 1){
// 						attributeIds[j] = parseInt(attributeIds[j]);
// 					}
// 				}
// 				if(attributeIds.length == 0 || attributeIds.indexOf(this.availableAttributes.foil[0].id) > -1){
// 					foilCost = foilCost * (1 - discount.discountPercentage);
// 				}
// 			}
// 		}

// 		foilCost = (foilCost % 1 === 0)? parseFloat(foilCost) : formatPrice(foilCost, true);
// 	}
// 	return foilCost;
// };

// DesignStudioItem.prototype.hasFoilColor = function() {
// 	let hasFoil = false;
// 	for(let i = 0, x = this.colorSwatches.length; i < x; i = i + 1){
// 		if(this.colorSwatches[i].colorSpace.toUpperCase() === 'SPOT' && !_.isNull(this.colorSwatches[i].spotValue) && !_.isUndefined(this.colorSwatches[i].spotValue) && !_.isEmpty(this.colorSwatches[i].spotValue)){
// 			hasFoil = true;
// 			break;
// 		}
// 	}

// 	for(let j = 0; j < this.textBoxes.length; j++){
// 		const cfList = this.textBoxes[j].contentFormatted;
// 		for(let k = 0; k < cfList.length; k++){
// 			const tsrList = cfList[k].textStyleRanges;
// 			if(!_.isNull(tsrList) && !_.isUndefined(tsrList)){
// 				for(let l = 0; l < tsrList.length; l++){
// 					const tsr = tsrList[l];
// 					if(tsr.fillColorSpace.toUpperCase() === 'SPOT' && notNullOrEmpty(tsr.fillSpotValue)){
// 						hasFoil = true;
// 						break;
// 					}
// 				}
// 			}
// 		}
// 	}

// 	return hasFoil;
// };

// DesignStudioItem.prototype.getFoilColorSpotValue = function() {
// 	let foilColor = null;
// 	for(let i = 0, x = this.colorSwatches.length; i < x; i = i + 1){
// 		if(this.colorSwatches[i].colorSpace.toUpperCase() === 'SPOT' && !_.isNull(this.colorSwatches[i].spotValue) && !_.isUndefined(this.colorSwatches[i].spotValue) && !_.isEmpty(this.colorSwatches[i].spotValue)){
// 			foilColor = this.colorSwatches[i].spotValue;
// 			break;
// 		}
// 	}

// 	for(let j = 0; j < this.textBoxes.length; j++){

// 		//TODO: special handling for 'titledGroupsTable'???
// 		if(this.textBoxes[j].contentType === 'month' || this.textBoxes[j].contentType == 'highlightDate') break;

// 		const cfList = this.textBoxes[j].contentFormatted;
// 		for(let k = 0; k < cfList.length; k++){
// 			const tsrList = cfList[k].textStyleRanges;
// 			for(let l = 0; l < tsrList.length; l++){
// 				const tsr = tsrList[l];
// 				if(tsr.fillColorSpace.toUpperCase() === 'SPOT' && notNullOrEmpty(tsr.fillSpotValue)){
// 					foilColor = tsr.fillSpotValue;
// 					break;
// 				}
// 			}
// 		}

// 	}
// 	return foilColor;
// };

// DesignStudioItem.prototype.getPriceWithAttribute = function(attributeId) {
// 	let attributeCost = 0, matchingAttribute = null, additionalAttributeCost = 0;
// 	if(!_.isNull(this.availableAttributes) && !_.isUndefined(this.availableAttributes)){
// 		if(!_.isNull(this.availableAttributes.foil) && !_.isUndefined(this.availableAttributes.foil) && this.availableAttributes.foil.length > 0){
// 			for(var i = 0, x = this.availableAttributes.foil.length; i < x; i = i + 1){
// 				if(this.availableAttributes.foil[i].id === attributeId){
// 					matchingAttribute = this.availableAttributes.foil[i];
// 					break;
// 				}
// 			}
// 		}
// 		if(_.isNull(matchingAttribute) && !_.isNull(this.availableAttributes.varnish) && !_.isUndefined(this.availableAttributes.varnish) && this.availableAttributes.varnish.length > 0){
// 			for(var i = 0, x = this.availableAttributes.varnish.length; i < x; i = i + 1){
// 				if(this.availableAttributes.varnish[i].id === attributeId){
// 					matchingAttribute = this.availableAttributes.varnish[i];
// 					break;
// 				}
// 			}
// 		}
// 		if(_.isNull(matchingAttribute) && !_.isNull(this.availableAttributes.other) && !_.isUndefined(this.availableAttributes.other) && this.availableAttributes.other.length > 0){
// 			for(var i = 0, x = this.availableAttributes.other.length; i < x; i = i + 1){
// 				if(this.availableAttributes.other[i].id === attributeId){
// 					matchingAttribute = this.availableAttributes.other[i];
// 					break;
// 				}
// 			}
// 		}
// 		if(_.isNull(matchingAttribute) && (!_.isNull(this.availableAttributes.substrates) && !_.isUndefined(this.availableAttributes.substrates) && this.availableAttributes.substrates.length > 0)){
// 			for(var i = 0, x = this.availableAttributes.substrates.length; i < x; i = i + 1){
// 				if(this.availableAttributes.substrates[i].id === attributeId){
// 					matchingAttribute = this.availableAttributes.substrates[i];
// 					break;
// 				}
// 			}
// 		}
// 	}

// 	let hasAttributeDiscount = false;
// 	if(!_.isNull(matchingAttribute)){
// 		if(!_.isNull(designStudio.dsJSON.discounts) && !_.isUndefined(designStudio.dsJSON.discounts) && designStudio.dsJSON.discounts.length > 0){
// 			let totalDiscountPercentage = 0;
// 			for(let j = 0, y = designStudio.dsJSON.discounts.length; j < y; j = j + 1){
// 				let discount = designStudio.dsJSON.discounts[j],
// 				attributeIds = [];

// 				if(!_.isNull(discount.attributeIdList) && !_.isUndefined(discount.attributeIdList)){
// 					attributeIds = discount.attributeIdList.split(',');
// 					for(let k = 0, z = attributeIds.length; k < z; k = k + 1){
// 						attributeIds[k] = parseInt(attributeIds[k]);
// 					}
// 				}
// 				if(attributeIds.indexOf(matchingAttribute.id) > -1){
// 					totalDiscountPercentage += discount.discountPercentage;
// 				} else if(_.isNull(discount.attributeIdList) || _.isUndefined(discount.attributeIdList)){
// 					totalDiscountPercentage += discount.discountPercentage;
// 				}
// 			}
// 			if(totalDiscountPercentage > 0){
// 				additionalAttributeCost += parseFloat(matchingAttribute.perPiecePrice * this.quantity * (1 - totalDiscountPercentage));
// 				hasAttributeDiscount = true;
// 			} else {
// 				additionalAttributeCost += parseFloat(matchingAttribute.perPiecePrice * this.quantity);
// 			}
// 		} else {
// 			additionalAttributeCost += parseFloat(matchingAttribute.perPiecePrice * this.quantity);
// 		}
// 	}

// 	if(this.isMailingService()){
// 		//Do not include price of mailing service
// 		if(hasAttributeDiscount){
// 			return formatPrice(parseFloat('0.00') + parseFloat(additionalAttributeCost));
// 		} else {
// 			return formatPrice((parseFloat('0.00') + parseFloat(additionalAttributeCost)) * (1 - this.discountPercentage));
// 		}
// 	} else {
// 		if(hasAttributeDiscount){
// 			return formatPrice(parseFloat(this.price * (1 - this.discountPercentage) || '0.00') + parseFloat(additionalAttributeCost));
// 		} else {
// 			return formatPrice((parseFloat(this.price || '0.00') + parseFloat(additionalAttributeCost)) * (1 - this.discountPercentage));
// 		}
// 	}
// };

// DesignStudioItem.prototype.getPriceWithAttributes = function() {
// 	let attributeCost = 0;
// 	if(!_.isNull(this.selectedAttributes) && !_.isUndefined(this.selectedAttributes) && this.selectedAttributes.length > 0){
// 		for(let i = 0, x = this.selectedAttributes.length; i < x; i = i + 1){
// 			attributeCost += parseFloat(this.selectedAttributes[i].perPiecePrice * this.quantity);
// 		}
// 	}
// 	return formatPrice(parseFloat(this.price || '0.00') + parseFloat(attributeCost));
// };

// DesignStudioItem.prototype.getPerPieceAttributeCost = function() {
// 	let attributeCost = 0;
// 	if(!_.isNull(this.selectedAttributes) && !_.isUndefined(this.selectedAttributes) && this.selectedAttributes.length > 0){
// 		for(let i = 0, x = this.selectedAttributes.length; i < x; i = i + 1){
// 			attributeCost += parseFloat(this.selectedAttributes[i].perPiecePrice);
// 		}
// 	}
// 	return formatPrice(parseFloat(attributeCost));
// };

// DesignStudioItem.prototype.getDiscountedPriceWithAttributes = function() {
// 	let attributeCost = 0, additionalAttributeCost = 0, hasAttributeDiscount = false;
// 	if(!_.isNull(this.selectedAttributes) && !_.isUndefined(this.selectedAttributes) && this.selectedAttributes.length > 0){
// 		for(let i = 0, x = this.selectedAttributes.length; i < x; i = i + 1){

// 			//attributeCost += parseFloat(this.selectedAttributes[i].perPiecePrice * this.quantity);

// 			if(!_.isNull(designStudio.dsJSON.discounts) && !_.isUndefined(designStudio.dsJSON.discounts) && designStudio.dsJSON.discounts.length > 0){
// 				let totalDiscountPercentage = 0;
// 				for(let j = 0, y = designStudio.dsJSON.discounts.length; j < y; j = j + 1){
// 					let discount = designStudio.dsJSON.discounts[j],
// 					attributeIds = [];

// 					if(!isNullOrEmpty(discount.attributeIdList)){
// 						attributeIds = discount.attributeIdList.split(',');
// 						for(let k = 0, z = attributeIds.length; k < z; k = k + 1){
// 							attributeIds[k] = parseInt(attributeIds[k]);
// 						}
// 					}
// 					if(attributeIds.indexOf(this.selectedAttributes[i].id) > -1){
// 						totalDiscountPercentage += discount.discountPercentage;
// 					} else if(isNullOrEmpty(discount.attributeIdList)){
// 						totalDiscountPercentage += discount.discountPercentage;
// 					}
// 				}
// 				if(totalDiscountPercentage > 0){
// 					additionalAttributeCost += parseFloat(this.selectedAttributes[i].perPiecePrice * this.quantity * (1 - totalDiscountPercentage));
// 					hasAttributeDiscount = true;
// 				} else {
// 					additionalAttributeCost += parseFloat(this.selectedAttributes[i].perPiecePrice * this.quantity);
// 				}
// 			} else {
// 				additionalAttributeCost += parseFloat(this.selectedAttributes[i].perPiecePrice * this.quantity);
// 			}
// 		}
// 	}

// 	if(hasAttributeDiscount){
// 		return formatPrice(parseFloat(this.price * (1 - this.discountPercentage) || '0.00') + parseFloat(additionalAttributeCost));
// 	} else {
// 		return formatPrice((parseFloat(this.price || '0.00') + parseFloat(additionalAttributeCost)) * (1 - this.discountPercentage));
// 	}

// 	/*var attributeCost = 0;
// 	if(!_.isNull(this.selectedAttributes) && !_.isUndefined(this.selectedAttributes) && this.selectedAttributes.length > 0){
// 		for(var i = 0, x = this.selectedAttributes.length; i < x; i = i + 1){
// 			attributeCost += parseFloat(this.selectedAttributes[i].perPiecePrice * this.quantity);
// 		}
// 	}
// 	return formatPrice(parseFloat(this.quantity * this.discountedUnitPrice) + parseFloat(attributeCost));*/
// };

// DesignStudioItem.prototype.updateSelectedAttributes = function() {
// 	this.selectedAttributes = [];

// 	const selectedAttributes = [];
// 	if(!_.isNull(this.substrateAttribute) && !_.isUndefined(this.substrateAttribute) && !_.isNull(this.substrateAttribute.id) && !_.isUndefined(this.substrateAttribute.id)){
// 		selectedAttributes.push(this.substrateAttribute);
// 	}

// 	if(!_.isNull(this.availableAttributes) && !_.isUndefined(this.availableAttributes)){
// 		if(!_.isNull(this.availableAttributes.foil) && !_.isUndefined(this.availableAttributes.foil) && this.availableAttributes.foil.length > 0){
// 			for(var i = 0, x = this.availableAttributes.foil.length; i < x; i = i + 1){
// 				const foilColorSpotValue = this.getFoilColorSpotValue();
// 				if(this.availableAttributes.foil[i].autoApply || (!_.isNull(foilColorSpotValue) && foilColorSpotValue === this.availableAttributes.foil[i].colorValue)){
// 					selectedAttributes.push(this.availableAttributes.foil[i]);
// 				}
// 			}
// 		}
// 		if(!_.isNull(this.availableAttributes.varnish) && !_.isUndefined(this.availableAttributes.varnish) && this.availableAttributes.varnish.length > 0){
// 			for(var i = 0, x = this.availableAttributes.varnish.length; i < x; i = i + 1){
// 				if(this.hasVarnish()){
// 					selectedAttributes.push(this.availableAttributes.varnish[i]);
// 				}
// 			}
// 		}
// 		if(!_.isNull(this.availableAttributes.other) && !_.isUndefined(this.availableAttributes.other) && this.availableAttributes.other.length > 0){
// 			for(var i = 0, x = this.availableAttributes.other.length; i < x; i = i + 1){
// 				var selectedAttributeValue;
// 				if(this.availableAttributes.other[i].groupWebDescription.toUpperCase() == 'ENVELOPE DESIGN' || this.availableAttributes.other[i].groupWebDescription.toUpperCase() == 'ENVELOPE LINER DESIGN' || (!_.isNull(this.availableAttributes.other[i].template) && !_.isUndefined(this.availableAttributes.other[i].template) && this.availableAttributes.other[i].template.indexOf('variation') > -1)){
// 					selectedAttributeValue = this.getSelectedEnvelopeDesign();
// 				}
// 				if(!_.isNull(selectedAttributeValue) && !_.isUndefined(selectedAttributeValue) && selectedAttributeValue.id === this.availableAttributes.other[i].id){
// 					selectedAttributes.push(this.availableAttributes.other[i]);
// 				}
// 			}
// 		}
// 		if((_.isNull(this.substrateAttribute) || _.isUndefined(this.substrateAttribute) || _.isNull(this.substrateAttribute.id) || _.isUndefined(this.substrateAttribute.id)) && (!_.isNull(this.availableAttributes.substrates) && !_.isUndefined(this.availableAttributes.substrates) && this.availableAttributes.substrates.length > 0)){
// 			for(var i = 0, x = this.availableAttributes.substrates.length; i < x; i = i + 1){
// 				if(this.availableAttributes.substrates[i].isDefault){
// 					selectedAttributes.push(this.availableAttributes.substrates[i]);
// 				}
// 			}
// 		}
// 	}

// 	if(!_.isNull(this.inkColorAttribute) && !_.isUndefined(this.inkColorAttribute) && !_.isNull(this.inkColorAttribute.id) && !_.isUndefined(this.inkColorAttribute.id)){
// 		selectedAttributes.push(this.inkColorAttribute);
// 	}

// 	if(!_.isNull(this.selectedVariation) && !_.isUndefined(this.selectedVariation) && !_.isNull(this.selectedVariation.id) && !_.isUndefined(this.selectedVariation.id)){
// 		selectedAttributes.push(this.selectedVariation);
// 	}

// 	this.selectedAttributes = selectedAttributes;
// };

// DesignStudioItem.prototype.getAttributeById = function(id) {
// 	let selectedAttribute = null;
// 	if(!_.isNull(this.availableAttributes) && !_.isUndefined(this.availableAttributes)){
// 		if(!_.isNull(this.availableAttributes.substrates) && !_.isUndefined(this.availableAttributes.substrates) && this.availableAttributes.substrates.length > 0){
// 			for(var i = 0, x = this.availableAttributes.substrates.length; i < x; i = i + 1){
// 				if(id === this.availableAttributes.substrates[i].id){
// 					selectedAttribute = this.availableAttributes.substrates[i];
// 					break;
// 				}
// 			}
// 		}
// 		if(selectedAttribute == null && !_.isNull(this.availableAttributes.foil) && !_.isUndefined(this.availableAttributes.foil) && this.availableAttributes.foil.length > 0){
// 			for(var i = 0, x = this.availableAttributes.foil.length; i < x; i = i + 1){
// 				if(id === this.availableAttributes.foil[i].id){
// 					selectedAttribute = this.availableAttributes.foil[i];
// 					break;
// 				}
// 			}
// 		}
// 		if(selectedAttribute == null && !_.isNull(this.availableAttributes.other) && !_.isUndefined(this.availableAttributes.other) && this.availableAttributes.other.length > 0){
// 			for(var i = 0, x = this.availableAttributes.other.length; i < x; i = i + 1){
// 				if(id === this.availableAttributes.other[i].id){
// 					selectedAttribute = this.availableAttributes.other[i];
// 					break;
// 				}
// 			}
// 		}
// 		if(selectedAttribute == null && !_.isNull(this.availableAttributes.varnish) && !_.isUndefined(this.availableAttributes.varnish) && this.availableAttributes.varnish.length > 0){
// 			for(var i = 0, x = this.availableAttributes.varnish.length; i < x; i = i + 1){
// 				if(id === this.availableAttributes.varnish[i].id){
// 					selectedAttribute = this.availableAttributes.varnish[i];
// 					break;
// 				}
// 			}
// 		}
// 	}

// 	return selectedAttribute;
// };

// DesignStudioItem.prototype.hasAttributeById = function(id) {
// 	let hasAttribute = false;
// 	if(!_.isNull(this.availableAttributes) && !_.isUndefined(this.availableAttributes)){
// 		if(!_.isNull(this.availableAttributes.substrates) && !_.isUndefined(this.availableAttributes.substrates) && this.availableAttributes.substrates.length > 0){
// 			for(var i = 0, x = this.availableAttributes.substrates.length; i < x; i = i + 1){
// 				if(id === this.availableAttributes.substrates[i].id){
// 					hasAttribute = true;
// 					break;
// 				}
// 			}
// 		}
// 		if(!hasAttribute && !_.isNull(this.availableAttributes.foil) && !_.isUndefined(this.availableAttributes.foil) && this.availableAttributes.foil.length > 0){
// 			for(var i = 0, x = this.availableAttributes.foil.length; i < x; i = i + 1){
// 				if(id === this.availableAttributes.foil[i].id){
// 					hasAttribute = true;
// 					break;
// 				}
// 			}
// 		}
// 		if(!hasAttribute && !_.isNull(this.availableAttributes.other) && !_.isUndefined(this.availableAttributes.other) && this.availableAttributes.other.length > 0){
// 			for(var i = 0, x = this.availableAttributes.other.length; i < x; i = i + 1){
// 				if(id === this.availableAttributes.other[i].id){
// 					hasAttribute = true;
// 					break;
// 				}
// 			}
// 		}
// 		if(!hasAttribute && !_.isNull(this.availableAttributes.varnish) && !_.isUndefined(this.availableAttributes.varnish) && this.availableAttributes.varnish.length > 0){
// 			for(var i = 0, x = this.availableAttributes.varnish.length; i < x; i = i + 1){
// 				if(id === this.availableAttributes.varnish[i].id){
// 					hasAttribute = true;
// 					break;
// 				}
// 			}
// 		}
// 	}

// 	return hasAttribute;
// };

// DesignStudioItem.prototype.hasSelectedAttributeByAttributeId = function(id) {
// 	let selectedAttribute = null;
// 	if(!_.isNull(this.selectedAttributes) && !_.isUndefined(this.selectedAttributes)){
// 		if(!_.isNull(this.selectedAttributes) && !_.isUndefined(this.selectedAttributes) && this.selectedAttributes.length > 0){
// 			for(let i = 0, x = this.selectedAttributes.length; i < x; i = i + 1){
// 				if(id === this.selectedAttributes[i].id){
// 					selectedAttribute = this.selectedAttributes[i];
// 					break;
// 				}
// 			}
// 		}
// 	}

// 	return (!_.isNull(selectedAttribute) && !_.isUndefined(selectedAttribute));
// };

// DesignStudioItem.prototype.getSelectedAttributeIdsAsString = function() {
// 	let selectedAttributeIds = '';
// 	if(!_.isNull(this.selectedAttributes) && !_.isUndefined(this.selectedAttributes)){
// 		if(!_.isNull(this.selectedAttributes) && !_.isUndefined(this.selectedAttributes) && this.selectedAttributes.length > 0){
// 			for(let i = 0, x = this.selectedAttributes.length; i < x; i = i + 1){
// 				if(selectedAttributeIds != ''){
// 					selectedAttributeIds += ','
// 				}
// 				selectedAttributeIds += this.selectedAttributes[i].id;
// 			}
// 		}
// 	}

// 	return selectedAttributeIds;
// };

// DesignStudioItem.prototype.getSelectedSubstrateAttribute = function() {
// 	let selectedSubstrateAttribute = null;
// 	if(!_.isNull(this.selectedAttributes) && !_.isUndefined(this.selectedAttributes)){
// 		if(!_.isNull(this.selectedAttributes) && !_.isUndefined(this.selectedAttributes) && this.selectedAttributes.length > 0){
// 			for(let i = 0, x = this.selectedAttributes.length; i < x; i = i + 1){
// 				if(this.selectedAttributes[i].groupWebDescription.toUpperCase().indexOf('PAPER') > -1 || this.selectedAttributes[i].groupWebDescription.toUpperCase().indexOf('ENVELOPE CHOICE') > -1){
// 					selectedSubstrateAttribute = this.selectedAttributes[i];
// 					break;
// 				}
// 			}
// 		}
// 	}

// 	return selectedSubstrateAttribute;
// };

// DesignStudioItem.prototype.hasColoredPaperSelected = function() {
// 	const substrateAttribute = this.getSelectedSubstrateAttribute();
// 	if(!_.isNull(substrateAttribute) && (substrateAttribute.shortWebDescription.toLowerCase() == 'black' || substrateAttribute.shortWebDescription.toLowerCase() == 'blue' || substrateAttribute.shortWebDescription.toLowerCase() == 'kraft')){
// 		return true;
// 	}
// 	return false;
// };

// DesignStudioItem.prototype.getSelectedFoilAttribute = function() {
// 	let selectedFoilAttribute = null;
// 	if(!_.isNull(this.selectedAttributes) && !_.isUndefined(this.selectedAttributes)){
// 		if(!_.isNull(this.selectedAttributes) && !_.isUndefined(this.selectedAttributes) && this.selectedAttributes.length > 0){
// 			for(let i = 0, x = this.selectedAttributes.length; i < x; i = i + 1){
// 				if(this.selectedAttributes[i].groupWebDescription.toUpperCase().indexOf('FOIL') > -1){
// 					selectedFoilAttribute = this.selectedAttributes[i];
// 					break;
// 				}
// 			}
// 		}
// 	}

// 	return selectedFoilAttribute;
// };

// DesignStudioItem.prototype.getSelectedEnvelopeDesign = function() {
// 	let selectedEnvelopeDesign = null;
// 	if(!_.isNull(this.envelopeAttribute) && !_.isUndefined(this.envelopeAttribute)){
// 		selectedEnvelopeDesign = this.envelopeAttribute;
// 	} else if(!_.isNull(this.selectedAttributes) && !_.isUndefined(this.selectedAttributes) && this.selectedAttributes.length > 0){
// 		for(var i = 0, x = this.selectedAttributes.length; i < x; i = i + 1){
// 			if(this.selectedAttributes[i].groupWebDescription.toUpperCase() == 'ENVELOPE DESIGN'){
// 				selectedEnvelopeDesign = this.selectedAttributes[i];
// 				break;
// 			}
// 		}
// 	}

// 	if(_.isNull(selectedEnvelopeDesign) || _.isUndefined(selectedEnvelopeDesign)){
// 		if(!_.isNull(this.availableAttributes.other) && !_.isUndefined(this.availableAttributes.other) && this.availableAttributes.other.length > 0){
// 			for(var i = 0, x = this.availableAttributes.other.length; i < x; i = i + 1){
// 				if(this.templateStylecode == this.availableAttributes.other[i].template){
// 					selectedEnvelopeDesign = this.availableAttributes.other[i];
// 					break;
// 				}
// 			}
// 		}
// 	}

// 	return selectedEnvelopeDesign;
// };

// DesignStudioItem.prototype.getDefaultEnvelopeDesign = function() {
// 	let selectedEnvelopeDesign = null;
// 	if(!_.isNull(this.availableAttributes.other) && !_.isUndefined(this.availableAttributes.other) && this.availableAttributes.other.length > 0){
// 		for(let i = 0, x = this.availableAttributes.other.length; i < x; i = i + 1){
// 			if(this.availableAttributes.other[i].isDefault){
// 				selectedEnvelopeDesign = this.availableAttributes.other[i];
// 				break;
// 			}
// 		}

// 		if(_.isNull(selectedEnvelopeDesign)){
// 			selectedEnvelopeDesign = this.availableAttributes.other[0];
// 		}
// 	}

// 	return selectedEnvelopeDesign;
// };

// DesignStudioItem.prototype.getSelectedEnvelopeLinerDesign = function() {
// 	let selectedEnvelopeDesign = null;
// 	if(!_.isNull(this.envelopeAttribute) && !_.isUndefined(this.envelopeAttribute)){
// 		selectedEnvelopeDesign = this.envelopeAttribute;
// 	} else if(!_.isNull(this.selectedAttributes) && !_.isUndefined(this.selectedAttributes) && this.selectedAttributes.length > 0){
// 		for(var i = 0, x = this.selectedAttributes.length; i < x; i = i + 1){
// 			if(this.selectedAttributes[i].groupWebDescription.toUpperCase() == 'ENVELOPE LINER DESIGN'){
// 				selectedEnvelopeDesign = this.selectedAttributes[i];
// 				break;
// 			}
// 		}
// 	}

// 	if(_.isNull(selectedEnvelopeDesign) || _.isUndefined(selectedEnvelopeDesign)){
// 		if(!_.isNull(this.availableAttributes.other) && !_.isUndefined(this.availableAttributes.other) && this.availableAttributes.other.length > 0){
// 			for(var i = 0, x = this.availableAttributes.other.length; i < x; i = i + 1){
// 				if(this.templateStylecode == this.availableAttributes.other[i].template){
// 					selectedEnvelopeDesign = this.availableAttributes.other[i];
// 					break;
// 				}
// 			}
// 		}
// 	}

// 	return selectedEnvelopeDesign;
// };

// DesignStudioItem.prototype.getSelectedVarnishAttribute = function() {
// 	let selectedVarnishAttribute = null;
// 	if(!_.isNull(this.selectedAttributes) && !_.isUndefined(this.selectedAttributes)){
// 		if(!_.isNull(this.selectedAttributes) && !_.isUndefined(this.selectedAttributes) && this.selectedAttributes.length > 0){
// 			for(let i = 0, x = this.selectedAttributes.length; i < x; i = i + 1){
// 				if(!_.isNull(this.selectedAttributes[i].groupWebDescription) && !_.isUndefined(this.selectedAttributes[i].groupWebDescription) && (this.selectedAttributes[i].groupWebDescription.toUpperCase().indexOf('GLOSS') > -1 || this.selectedAttributes[i].groupWebDescription.toUpperCase().indexOf('VARNISH') > -1)){
// 					selectedVarnishAttribute = this.selectedAttributes[i];
// 					break;
// 				}
// 			}
// 		}
// 	}

// 	return selectedVarnishAttribute;
// };

// DesignStudioItem.prototype.getAvailableVarnishAttribute = function() {
// 	let availableVarnishAttribute = null;
// 	if(!_.isNull(this.availableAttributes) && !_.isUndefined(this.availableAttributes)){
// 		if(!_.isNull(this.availableAttributes.varnish) && !_.isUndefined(this.availableAttributes.varnish) && this.availableAttributes.varnish.length > 0){
// 			for(let i = 0, x = this.availableAttributes.varnish.length; i < x; i = i + 1){
// 				if(!_.isNull(this.selectedAttributes[i].groupWebDescription) && !_.isUndefined(this.selectedAttributes[i].groupWebDescription) && (this.availableAttributes.varnish[i].groupWebDescription.toUpperCase().indexOf('GLOSS') > -1 || this.availableAttributes.varnish[i].groupWebDescription.toUpperCase().indexOf('VARNISH') > -1)){
// 					availableVarnishAttribute = this.availableAttributes.varnish[i];
// 					break;
// 				}
// 			}
// 		}
// 	}

// 	return availableVarnishAttribute;
// };

// DesignStudioItem.prototype.hasVarnish = function() {
// 	const varnishAttribute = this.getSelectedVarnishAttribute();
// 	if($j('.designStudio .varnish.toggleControl').length > 0){
// 		if($j('.designStudio .varnish.toggleControl').get(0).checked){
//     		return true;
//     	} else {
//     		return false;
//     	}
// 	} else if(!_.isNull(varnishAttribute)){
// 		return true;
// 	}
// 	return false;
// };

// DesignStudioItem.prototype.hasVarnishAvailable = function() {
// 	const varnishAttribute = this.getAvailableVarnishAttribute();
// 	if(!_.isNull(varnishAttribute)){
// 		return true;
// 	}
// 	return false;
// };

// DesignStudioItem.prototype.getSelectedInkColor = function() {
// 	let selectedInkColor = null;
// 	if(!_.isNull(this.selectedAttributes) && !_.isUndefined(this.selectedAttributes) && this.selectedAttributes.length > 0){
// 		for(let i = 0, x = this.selectedAttributes.length; i < x; i = i + 1){
// 			if(this.selectedAttributes[i].groupWebDescription.toUpperCase() == 'INK COLOR'){
// 				selectedInkColor = this.selectedAttributes[i];
// 				break;
// 			}
// 		}
// 	}

// 	return selectedInkColor;
// };

// DesignStudioItem.prototype.getDefaultInkColor = function() {
// 	let selectedInkColor = null;
// 	if(!_.isNull(this.availableAttributes.other) && !_.isUndefined(this.availableAttributes.other) && this.availableAttributes.other.length > 0){
// 		for(let i = 0, x = this.availableAttributes.other.length; i < x; i = i + 1){
// 			if(this.availableAttributes.other[i].isDefault){
// 				selectedInkColor = this.availableAttributes.other[i];
// 				break;
// 			}
// 		}

// 		if(_.isNull(selectedInkColor)){
// 			selectedInkColor = this.availableAttributes.other[0];
// 		}
// 	}

// 	return selectedInkColor;
// };

// DesignStudioItem.prototype.getSelectedVariationAttribute = function() {
// 	let selectedVariationAttribute = null;
// 	if(!_.isNull(this.selectedAttributes) && !_.isUndefined(this.selectedAttributes)){
// 		if(!_.isNull(this.selectedAttributes) && !_.isUndefined(this.selectedAttributes) && this.selectedAttributes.length > 0){
// 			for(let i = 0, x = this.selectedAttributes.length; i < x; i = i + 1){
// 				if(this.selectedAttributes[i].groupId == 41){
// 					selectedVariationAttribute = this.selectedAttributes[i];
// 					break;
// 				}
// 			}
// 		}
// 	}

// 	return selectedVariationAttribute;
// };

// DesignStudioItem.prototype.isStockItemWithNothingEditable = function(){
// 	let stockAndUneditable = false;
// 	if(this.itemType == 'STOCK' && !notNullOrZeroLength(this.imprintData) && $j.isEmptyObject(this.availableAttributes)){
// 		stockAndUneditable = true;
// 	}
// 	return stockAndUneditable;
// }

// DesignStudioItem.prototype.hideIncorrectEnvelopeSubstrateViews = function() {
// 	let selectedEnvelopeColor, envelopeItem = designStudio.getMatchingEnvelopeItem(this);
// 	if(!_.isNull(envelopeItem) && !_.isNull(envelopeItem.selectedAttributes) && !_.isUndefined(envelopeItem.selectedAttributes) && envelopeItem.selectedAttributes.length > 0){
// 		for(let i = 0; i < envelopeItem.selectedAttributes.length; i = i + 1){
// 			if(envelopeItem.selectedAttributes[i].groupWebDescription.toUpperCase().indexOf('ENVELOPE') > -1){
// 				selectedEnvelopeColor = envelopeItem.selectedAttributes[i].webDescription.toLowerCase();
// 			}
// 		}
// 	} else if(!_.isNull(designStudio.dsJSON.attributeSubstrateToUse) && !_.isUndefined(designStudio.dsJSON.attributeSubstrateToUse)) {
// 		selectedEnvelopeColor = designStudio.dsJSON.attributeSubstrateToUse.toLowerCase().replace(/\s/g, '');
// 	} else {
// 		selectedEnvelopeColor = 'white';
// 	}

// 	if(!_.isNull(selectedEnvelopeColor) && !_.isUndefined(selectedEnvelopeColor) && this.views.length > 1){
// 		for(var j = 0; j < this.views.length; j = j + 1){
// 			if(this.views[j].sceneName.toLowerCase().indexOf(selectedEnvelopeColor) >= 0){
// 				this.views[j].visible = true;
// 			} else {
// 				this.views[j].visible = false;
// 			}
// 		}
// 		for(var j = 0; j < this.proofingViews.length; j = j + 1){
// 			if(this.proofingViews[j].sceneName.toLowerCase().indexOf(selectedEnvelopeColor) >= 0){
// 				this.proofingViews[j].visible = true;
// 			} else {
// 				this.proofingViews[j].visible = false;
// 			}
// 		}
// 	}
// };

// DesignStudioItem.prototype.hideIncorrectEnvelopeSubstrateProofingViews = function() {
// 	let selectedEnvelopeColor, envelopeItem = designStudio.getMatchingEnvelopeItem(this);
// 	if(!_.isNull(envelopeItem) && !_.isNull(envelopeItem.selectedAttributes) && !_.isUndefined(envelopeItem.selectedAttributes) && envelopeItem.selectedAttributes.length > 0){
// 		for(let i = 0; i < envelopeItem.selectedAttributes.length; i = i + 1){
// 			if(envelopeItem.selectedAttributes[i].groupWebDescription.toUpperCase().indexOf('ENVELOPE') > -1){
// 				selectedEnvelopeColor = envelopeItem.selectedAttributes[i].webDescription.toLowerCase();
// 			}
// 		}
// 	} else if(!_.isNull(designStudio.dsJSON.attributeSubstrateToUse) && !_.isUndefined(designStudio.dsJSON.attributeSubstrateToUse)) {
// 		selectedEnvelopeColor = designStudio.dsJSON.attributeSubstrateToUse.toLowerCase().replace(/\s/g, '');
// 	} else {
// 		selectedEnvelopeColor = 'white';
// 	}

// 	if(!_.isNull(selectedEnvelopeColor) && !_.isUndefined(selectedEnvelopeColor) && this.proofingViews.length > 1){
// 		for(let j = 0; j < this.proofingViews.length; j = j + 1){
// 			if(this.proofingViews[j].sceneName.toLowerCase().indexOf(selectedEnvelopeColor) >= 0){
// 				this.proofingViews[j].visible = true;
// 			} else {
// 				this.proofingViews[j].visible = false;
// 			}
// 		}
// 	}
// };

// DesignStudioItem.prototype.getEnvelopeSubstrateJSON = function() {
// 	let selectedEnvelopeColor, envelopeItem = designStudio.getMatchingEnvelopeItem(this), envelopeMailingServiceItem = designStudio.getEnvelopeMailingServiceItem();
// 	if(!_.isNull(envelopeItem) && !_.isNull(envelopeItem.selectedAttributes) && !_.isUndefined(envelopeItem.selectedAttributes) && envelopeItem.selectedAttributes.length > 0){
// 		for(var i = 0; i < envelopeItem.selectedAttributes.length; i = i + 1){
// 			if(envelopeItem.selectedAttributes[i].groupWebDescription.toUpperCase().indexOf('ENVELOPE') > -1){
// 				selectedEnvelopeColor = envelopeItem.selectedAttributes[i].webDescription.toLowerCase();
// 			}
// 		}
// 	} else if(!_.isNull(envelopeMailingServiceItem) && !_.isNull(envelopeMailingServiceItem.selectedAttributes) && !_.isUndefined(envelopeMailingServiceItem.selectedAttributes) && envelopeMailingServiceItem.selectedAttributes.length > 0){
// 		for(var i = 0; i < envelopeMailingServiceItem.selectedAttributes.length; i = i + 1){
// 			if(envelopeMailingServiceItem.selectedAttributes[i].groupWebDescription.toUpperCase().indexOf('ENVELOPE') > -1){
// 				selectedEnvelopeColor = envelopeMailingServiceItem.selectedAttributes[i].webDescription.toLowerCase();
// 			}
// 		}
// 	} else if(!_.isNull(designStudio.dsJSON.attributeSubstrateToUse) && !_.isUndefined(designStudio.dsJSON.attributeSubstrateToUse)) {
// 		selectedEnvelopeColor = designStudio.dsJSON.attributeSubstrateToUse.toLowerCase().replace(/\s/g, '');
// 	} else {
// 		selectedEnvelopeColor = 'white';
// 	}

// 	if(!_.isNull(selectedEnvelopeColor) && !_.isUndefined(selectedEnvelopeColor) && this.views.length > 1){
// 		for(var j = 0; j < this.views.length; j = j + 1){
// 			if(this.views[j].sceneName.toLowerCase().indexOf(selectedEnvelopeColor) >= 0){
// 				this.views[j].visible = true;
// 			} else {
// 				this.views[j].visible = false;
// 			}
// 		}
// 		for(var j = 0; j < this.proofingViews.length; j = j + 1){
// 			if(this.proofingViews[j].sceneName.toLowerCase().indexOf(selectedEnvelopeColor) >= 0){
// 				this.proofingViews[j].visible = true;
// 			} else {
// 				this.proofingViews[j].visible = false;
// 			}
// 		}
// 	}
// };

// DesignStudioItem.prototype.getFirstVisibleView = function() {
// 	for(let j = 0; j < this.views.length; j = j + 1){
// 		if(this.views[j].visible){
// 			return this.views[j];
// 		}
// 	}
// 	return this.views[0];
// };

// DesignStudioItem.prototype.getFirstVisibleViewIndex = function() {
// 	for(let j = 0; j < this.views.length; j = j + 1){
// 		if(this.views[j].visible){
// 			return j;
// 		}
// 	}
// 	return 0;
// };

// DesignStudioItem.prototype.getFirstVisibleProofingView = function() {
// 	if(!_.isNull(this.proofingViews) && !_.isUndefined(this.proofingViews) && this.proofingViews.length > 0){
// 		for(let j = 0; j < this.proofingViews.length; j = j + 1){
// 			if(this.proofingViews[j].visible){
// 				return this.proofingViews[j];
// 			}
// 		}
// 		return this.proofingViews[0];
// 	} else {
// 		return null;
// 	}
// };

// DesignStudioItem.prototype.getFirstVisibleProofingViewIndex = function() {
// 	if(!_.isNull(this.proofingViews) && !_.isUndefined(this.proofingViews) && this.proofingViews.length > 0){
// 		for(let j = 0; j < this.proofingViews.length; j = j + 1){
// 			if(this.proofingViews[j].visible){
// 				return j;
// 			}
// 		}
// 		return 0;
// 	} else {
// 		return null;
// 	}
// };

// DesignStudioItem.prototype.isForKraftEnvelope = function() {
// 	let selectedEnvelopeColor, envelopeItem = designStudio.getMatchingEnvelopeItem(this);
// 	if((this.productStylecode.indexOf('ENVG') > -1 || this.productStylecode.indexOf('ENVR') > -1) && !_.isNull(envelopeItem) && !_.isNull(envelopeItem.selectedAttributes) && !_.isUndefined(envelopeItem.selectedAttributes) && envelopeItem.selectedAttributes.length > 0){
// 		for(let i = 0; i < envelopeItem.selectedAttributes.length; i = i + 1){
// 			if(envelopeItem.selectedAttributes[i].groupWebDescription.toUpperCase().indexOf('ENVELOPE') > -1){
// 				selectedEnvelopeColor = envelopeItem.selectedAttributes[i].webDescription.toLowerCase();
// 			}
// 		}

// 		if(!_.isNull(selectedEnvelopeColor) && !_.isUndefined(selectedEnvelopeColor) && selectedEnvelopeColor.toUpperCase() == 'KRAFT'){
// 			return true;
// 		} else {
// 			return false;
// 		}
// 	} else if((this.productStylecode.indexOf('ENVG') > -1 || this.productStylecode.indexOf('ENVR') > -1) && !_.isNull(designStudio.dsJSON.attributeSubstrateToUse) && !_.isUndefined(designStudio.dsJSON.attributeSubstrateToUse) && designStudio.dsJSON.attributeSubstrateToUse.toUpperCase() == 'KRAFT') {
// 		return true;
// 	}
// 	return false;
// };

// DesignStudioItem.prototype.getParentEnvelopeSubstrateDescription = function(){
// 	let selectedEnvelopeColor = '',
// 		envelopeItem = designStudio.getMatchingEnvelopeItem(this);
// 	if((this.productStylecode.indexOf('ENVG') > -1 || this.productStylecode.indexOf('ENVR') > -1) && !_.isNull(envelopeItem) && !_.isNull(envelopeItem.selectedAttributes) && !_.isUndefined(envelopeItem.selectedAttributes) && envelopeItem.selectedAttributes.length > 0){
// 		for(let i = 0; i < envelopeItem.selectedAttributes.length; i = i + 1){
// 			if(envelopeItem.selectedAttributes[i].groupWebDescription.toUpperCase().indexOf('ENVELOPE') > -1){
// 				selectedEnvelopeColor = envelopeItem.selectedAttributes[i].webDescription.toLowerCase();
// 			}
// 		}
// 	}
// 	return selectedEnvelopeColor;
// };

// DesignStudioItem.prototype.updateColorsToBlackAndRender = function(){
// 	let black = null;
// 	for(let i = 0, x = msColors.colors[0].swatches.length; i < x; i = i + 1){
// 		if(msColors.colors[0].swatches[i].name.toUpperCase() == 'BLACK'){
// 			black = msColors.colors[0].swatches[i];
// 			break
// 		}
// 	}
// 	for(let j = 0, y = this.colorSwatches.length; j < y; j = j + 1){
// 		this.colorSwatches[j].updateColor(black);
// 	}

// 	designStudio.renderItem(this);
// 	this.handleColorChange(designStudio.updateItemAndReRenderEditableAttributes);
// };

// DesignStudioItem.prototype.updateColorsToBlack = function(){
// 	let black = null;
// 	for(let i = 0, x = msColors.colors[0].swatches.length; i < x; i = i + 1){
// 		if(msColors.colors[0].swatches[i].name.toUpperCase() == 'BLACK'){
// 			black = msColors.colors[0].swatches[i];
// 			break
// 		}
// 	}
// 	for(let j = 0, y = this.colorSwatches.length; j < y; j = j + 1){
// 		this.colorSwatches[j].updateColor(black);
// 	}

// 	//designStudio.renderItem(this);
// 	//this.handleColorChange(designStudio.updateItemAndReRenderEditableAttributes);
// };

// DesignStudioItem.prototype.getTextBoxByTagName = function(textBoxTagName){
// 	let textBox = null;
// 	if(!_.isNull(this.textBoxes) && !_.isUndefined(this.textBoxes) && this.textBoxes.length > 0){
// 		for(let i = 0; i < this.textBoxes.length; i++){
// 			if(this.textBoxes[i].tagName == textBoxTagName){
// 				textBox = this.textBoxes[i];
// 			}
// 		}
// 	}
// 	return textBox;
// };

// DesignStudioItem.prototype.getTextBoxByTagName_looseMatch = function(textBoxTagName){
// 	let textBox = null;
// 	if(!_.isNull(this.textBoxes) && !_.isUndefined(this.textBoxes) && this.textBoxes.length > 0){
// 		for(let i = 0; i < this.textBoxes.length; i++){
// 			const targetTagName = notNullOrEmpty(this.textBoxes[i].tagName) ? this.textBoxes[i].tagName : '';
// 			if(notNullOrEmpty(textBoxTagName) && targetTagName.indexOf(textBoxTagName) > -1){
// 				textBox = this.textBoxes[i];
// 			}
// 		}
// 	}
// 	return textBox;
// };

// DesignStudioItem.prototype.getTextBoxesByTagName_looseMatch = function(textBoxTagName){
// 	const textBoxes = [];
// 	if(!_.isNull(this.textBoxes) && !_.isUndefined(this.textBoxes) && this.textBoxes.length > 0){
// 		for(let i = 0; i < this.textBoxes.length; i++){
// 			const targetTagName = notNullOrEmpty(this.textBoxes[i].tagName) ? this.textBoxes[i].tagName : '';
// 			if(notNullOrEmpty(textBoxTagName) && targetTagName.indexOf(textBoxTagName) > -1){
// 				textBoxes.push(this.textBoxes[i]);
// 			}
// 		}
// 	}
// 	return textBoxes;
// };

// DesignStudioItem.prototype.getFirstCompatibleSubstrateForFoilOrVarnish = function(matchAttributeId){
// 	const substrates = designStudio.currentDSItem.availableAttributes.substrates;
// 	for(let i = 0; i < substrates.length; i = i + 1){
// 		if(!_.isNull(substrates[i].notAllowedWith) && !_.isUndefined(substrates[i].notAllowedWith) && (substrates[i].notAllowedWith.length > 0 && substrates[i].notAllowedWith.indexOf(matchAttributeId) < 0) || (substrates[i].notAllowedWith.length == 0)){
// 			return substrates[i];
// 		}
// 	}
// 	return null;
// }

// DesignStudioItem.prototype.compatibleSubstrateRequiredForFoil = function(spotColorValue){
// 	return (notNullOrEmpty(spotColorValue) &&
// 			!this.foilCompatibleWithAllCurrentlySelectedAttributes());
// }

// DesignStudioItem.prototype.foilCompatibleWithAllCurrentlySelectedAttributes = function(){
// 	const self = this;
// 	let allClear = true;

// 	if(this.foilAttributesAvailable()){

// 		const allNotAllowedIds = _.reduce(this.availableAttributes.foil, function(idList, foil){
// 				return idList.concat(foil.notAllowedWith || []);
// 			}, []);

// 		const notAllowedUniqueIdList = allNotAllowedIds.filter(onlyUniqueTest.bind(allNotAllowedIds));
// 		const collisionFound = _.reduce(notAllowedUniqueIdList, function(collisionFound, notAllowedId){
// 					return (collisionFound || self.hasSelectedAttributeByAttributeId(notAllowedId));
// 			}, false);
// 		allClear = !collisionFound;
// 	}
// 	return allClear;
// };

// DesignStudioItem.prototype.varnishCompatibleWithAllCurrentlySelectedAttributes = function(){
// 	const self = this;
// 	let allClear = true;

// 	if(this.varnishAttributesAvailable()){

// 		const allNotAllowedIds = _.reduce(this.availableAttributes.varnish, function(idList, varnish){
// 				return idList.concat(varnish.notAllowedWith || []);
// 			}, []);

// 		const notAllowedUniqueIdList = allNotAllowedIds.filter(onlyUniqueTest.bind(allNotAllowedIds));
// 		const collisionFound = _.reduce(notAllowedUniqueIdList, function(collisionFound, notAllowedId){
// 				return (collisionFound || self.hasSelectedAttributeByAttributeId(notAllowedId));
// 			}, false);
// 		allClear = !collisionFound;
// 	}
// 	return allClear;
// };

// DesignStudioItem.prototype.stubOutFakeAttribute = function() {
// 	const fakeAttribute = {};
// 	fakeAttribute.id = this.productId;
// 	fakeAttribute.webDescription = this.productWebDescription;
// 	fakeAttribute.template = this.productStylecode;
// 	fakeAttribute.imageUrl = this.getBrowseImageUrl();

// 	return fakeAttribute;
// };

// DesignStudioItem.prototype.getBrowseImageUrl = function() {
// 	let browseImageUrl = this.responsiveIceUrl + this.productStylecode + '/', foundImage = false;

// 	if(!_.isNull(this.productViewSet) && !_.isUndefined(this.productViewSet) && this.productViewSet.length > 0){
// 		for(let i = 0, x = this.productViewSet.length; i < x; i = i + 1){
// 			if(this.productViewSet[i].origin.toLowerCase() == 'browse'){
// 				browseImageUrl += this.productViewSet[i].scene;
// 				foundImage = true;
// 				break;
// 			}
// 		}
// 	}

// 	if(!foundImage){
// 		browseImageUrl += this.productViewSet[0].scene;
// 	}

// 	return browseImageUrl;
// };

// DesignStudioItem.prototype.isMailWithoutEnvelopeProduct = function() {
// 	if(designStudio.mailWithoutEnvelopeProductTypes.indexOf(this.typeCode) > -1){
// 		return true;
// 	}

// 	return false;
// };

// DesignStudioItem.prototype.isEnvelope = function() {
// 	if(designStudio.envelopeProductTypes.indexOf(this.typeCode) > -1){
// 		return true;
// 	}

// 	return false;
// };

// DesignStudioItem.prototype.isEnvelopeLiner = function() {
// 	if(designStudio.envelopeLinerProductTypes.indexOf(this.typeCode) > -1){
// 		return true;
// 	}

// 	return false;
// };

// DesignStudioItem.prototype.isGuestAddress = function() {
// 	if(designStudio.envelopeGuestAddressProductTypes.indexOf(this.typeCode) > -1){
// 		return true;
// 	}

// 	return false;
// };

// DesignStudioItem.prototype.isReturnAddress = function() {
// 	if(designStudio.envelopeReturnAddressProductTypes.indexOf(this.typeCode) > -1 && !designStudio.ENVRWithEnvelopeTypeIds.includes(this.typeId)){
// 		return true;
// 	}

// 	return false;
// };

// DesignStudioItem.prototype.isENVRWithEnvelope = function() {
// 	if(designStudio.ENVRWithEnvelopeTypeIds.includes(this.typeId)){
// 		return true;
// 	}

// 	return false;
// };

// DesignStudioItem.prototype.isRSVPEnvelope = function() {
// 	if(designStudio.RSVPEnvelopeTypeIds.includes(this.typeId)){
// 		return true;
// 	}

// 	return false;
// };

// DesignStudioItem.prototype.isLabelOrSeal = function() {
// 	if(designStudio.envelopeLabelsProductTypes.indexOf(this.typeCode) > -1){
// 		return true;
// 	}

// 	return false;
// };

// DesignStudioItem.prototype.isLabelOrLabelSealSet = function() {
// 	if(designStudio.envelopeLabelsProductTypes_omitSealOnlyTypes.indexOf(this.typeCode) > -1){
// 		return true;
// 	}

// 	return false;
// };

// DesignStudioItem.prototype.isEnvelopeDesign = function() {
// 	if(designStudio.envelopeDesignProductTypes.indexOf(this.typeCode) > -1){
// 		return true;
// 	}

// 	return false;
// };

// DesignStudioItem.prototype.isMailingService = function() {
// 	if(designStudio.envelopeMailingServiceProductTypes.indexOf(this.typeCode) > -1){
// 		return true;
// 	}

// 	return false;
// };

// DesignStudioItem.prototype.isAllInOne = function() {
// 	if(designStudio.allInOneProductTypes.indexOf(this.typeCode) > -1){
// 		return true;
// 	}

// 	return false;
// };

// DesignStudioItem.prototype.isPostage = function() {
// 	if(designStudio.postageProductTypes.indexOf(this.typeCode) > -1){
// 		return true;
// 	}

// 	return false;
// };

// DesignStudioItem.prototype.doesNotAllowUploadLaterGuestList = function() {
// 	if(designStudio.noUploadLaterGuestListProductTypeIds.includes(this.typeId)){
// 		return true;
// 	}

// 	return false;
// };

// DesignStudioItem.prototype.isForEnvelope = function() {
// 	if(this.isEnvelopeLiner()){
// 		return true;
// 	} else if(this.isGuestAddress()){
// 		return true;
// 	} else if(this.isReturnAddress()){
// 		return true;
// 	} else if(this.isLabelOrSeal()){
// 		return true;
// 	} else if(this.isEnvelopeDesign()){
// 		return true;
// 	}

// 	return false;
// };

// DesignStudioItem.prototype.isRubberStamp = function() {
// 	if(designStudio.rubberStampProductTypes.indexOf(this.typeCode) > -1){
// 		return true;
// 	}

// 	return false;
// };

// DesignStudioItem.prototype.foilAttributesAvailable = function(){
// 	return (this.availableAttributes &&
// 			this.availableAttributes.foil &&
// 			this.availableAttributes.foil.length > 0);
// };

// DesignStudioItem.prototype.varnishAttributesAvailable = function(){
// 	return (this.availableAttributes &&
// 			this.availableAttributes.varnish &&
// 			this.availableAttributes.varnish.length > 0);
// };

// DesignStudioItem.prototype.updateSubstrate = function(substrateAttributeId){
// 	const substrateAttribute = designStudio.currentDSItem.getAttributeById(substrateAttributeId);
// 	this.substrateAttribute = substrateAttribute;
// 	this.updateSelectedAttributes(substrateAttributeId);
// };

// DesignStudioItem.prototype.removeDuplicateIDSTextTags = function(){
// 	if(this.IDSObject && this.IDSObject.textTags && this.IDSObject.textTags.length > 0){
// 		this.IDSObject.textTags = _.reduce(this.IDSObject.textTags, function(dedupedList, originalListTagData){
// 			const tagNamesInDedupedList = _.map(dedupedList, function(dedupedTagData){ return dedupedTagData.name; });
// 			if(tagNamesInDedupedList.indexOf(originalListTagData.name) === -1)
// 				dedupedList.push(originalListTagData);
// 			return dedupedList;
// 		}, []);
// 	}
// };

// DesignStudioItem.prototype.pushTextChangesFromMasterTextBoxToClones = function(masterTextBox){
// 	const cloneTagName = masterTextBox.tagName.replace(MASTER_TAG_QUALIFIER, CLONE_TAG_QUALIFIER);
// 	this.textBoxes.forEach(function(textBox){
// 		if(textBox.tagName == cloneTagName){
// 			textBox.contentFormatted = masterTextBox.contentFormatted;
// 			textBox.fillColorR = masterTextBox.fillColorR;
// 			textBox.fillColorG = masterTextBox.fillColorG;
// 			textBox.fillColorB = masterTextBox.fillColorB;
// 			textBox.fillColorC = masterTextBox.fillColorC;
// 			textBox.fillColorM = masterTextBox.fillColorM;
// 			textBox.fillColorY = masterTextBox.fillColorY;
// 			textBox.fillColorK = masterTextBox.fillColorK;
// 		}
// 	});
// };
// DesignStudioItem.prototype.pushImageChangesFromMasterImageBoxToClones = function(masterImageBox){
// 	const dsItem = this,
// 		cloneTagName = masterImageBox.tagName.replace(MASTER_TAG_QUALIFIER, CLONE_TAG_QUALIFIER);

// 	this.imageBoxes.forEach(function(imageBox){
// 		if(imageBox.tagName == cloneTagName){
// 			dsItem.copyImageAndPositionFromSourceImageBoxToTargetImageBox(masterImageBox, imageBox);
// 		}
// 	});
// };

// DesignStudioItem.prototype.copyImageAndPositionFromSourceImageBoxToTargetImageBox = function(sourceImageBox, targetImageBox){
// 	const dsItem = this;
// 	if(_.isNull(targetImageBox.imageName) ||
// 	   (sourceImageBox.imageName.split('.')[1] != targetImageBox.imageName.split('.')[1]) ||
// 	   (sourceImageBox.imageName.indexOf('ML_') > -1 && sourceImageBox.imageName != targetImageBox.imageName)){

// 		targetImageBox.imageName = sourceImageBox.imageName;
// 		targetImageBox.hidden = sourceImageBox.hidden;
// 		targetImageBox.modified = true;
// 		targetImageBox.manipulated = true;

// 		const sourceImageData = sourceImageBox.getPositionData();
// 		targetImageBox.imageCurrentPixelHeight = (sourceImageData.height / designStudio.scaleMultiplier);
// 		targetImageBox.imageCurrentPixelWidth = (sourceImageData.width / designStudio.scaleMultiplier);
// 		targetImageBox.imageRotationAngle = sourceImageBox.imageRotationAngle;

// 		dsItem.placeImageIntoDocument(targetImageBox, function(dsii){
// 			dsii.setInitialImagePosition(targetImageBox.getPositionData(), true);
// 		});
// 	} else {
// 		targetImageBox.modified = true;
// 		targetImageBox.manipulated = true;
// 		targetImageBox.imageRotationAngle = sourceImageBox.imageRotationAngle;

// 		targetImageBox.imageTop = targetImageBox.top + (sourceImageBox.imageTop - sourceImageBox.top);
// 		targetImageBox.imageLeft = targetImageBox.left + (sourceImageBox.imageLeft - sourceImageBox.left);
// 		targetImageBox.imageBottom = targetImageBox.bottom + (sourceImageBox.imageBottom - sourceImageBox.bottom);
// 		targetImageBox.imageRight = targetImageBox.right + (sourceImageBox.imageRight - sourceImageBox.right);
// 		targetImageBox.imageCurrentPixelWidth = sourceImageBox.imageCurrentPixelWidth;
// 		targetImageBox.imageCurrentPixelHeight = sourceImageBox.imageCurrentPixelHeight;
// 		targetImageBox.imageNativePixelWidth = sourceImageBox.imageNativePixelWidth;
// 		targetImageBox.imageNativePixelHeight = sourceImageBox.imageNativePixelHeight;
// 	}
// }

// DesignStudioItem.prototype.getSingleDocumentId = function (dsCallback) {
// 	let newGetDOLUrl = '/ids/setupSession?',
// 		dsi = this;

// 	newGetDOLUrl += "sessionId=" + encodeURIComponent(designStudio.user.sessionId);
// 	if(this.isMultidocument){
// 		newGetDOLUrl += "&documentId=NEW-MULTIDOCUMENT-VIEW";
// 		newGetDOLUrl += "&templateId=" + this.productStylecode;
// 		isMultiDoc = true;
// 	} else {
// 		newGetDOLUrl += "&documentId=NEW-DOCUMENT-FROM-TEMPLATE";
// 		newGetDOLUrl += "&templateId=" + this.productStylecode;
// 	}

// 	const variation = this.getSelectedVariationAttribute();
// 	if(!_.isNull(variation) && !_.isUndefined(variation)){
// 		newGetDOLUrl += '&variation=' + variation.template;
// 	}

// 	newGetDOLUrl += "&r=" + Math.floor(Math.random()*11111);

// 	$j.get(newGetDOLUrl, function( data ) {

// 		const newSessionId = data.description.split(":")[0],
// 			newDocumentId = data.description.split(":")[1];

// 		designStudio.updateDocumentListSessionId(dsi, newSessionId);
// 		designStudio.updateDocumentListDocumentId(dsi, newDocumentId);

// 		dsi.sessionId = newSessionId,
// 		dsi.documentId = newDocumentId;

// 		(dsCallback!== undefined && dsCallback !== null)? dsCallback(dsi) : null;
// 	});
// };

// DesignStudioItem.prototype.textChangesCouldApplyToMultiplePages = function(textBox){
// 	return tagNameHasQualifier(textBox.tagName, MASTER_TAG_QUALIFIER) &&
// 			masterAndCloneElementsExistOnDifferentPages(this.textBoxes);
// };
// DesignStudioItem.prototype.imageChangesCouldApplyToMultiplePages = function(imageBox){
// 	return tagNameHasQualifier(imageBox.tagName, MASTER_TAG_QUALIFIER) &&
// 			masterAndCloneElementsExistOnDifferentPages(this.imageBoxes);
// };

// DesignStudioItem.DISPLAY_DATE_FORMAT = 'MMMM DD, YYYY';
// DesignStudioItem.DISPLAY_DATE_FORMAT_NARROW = 'MM/DD/YYYY';
// DesignStudioItem.DISPLAY_DATE_FORMAT_COMPACT = 'MM/DD/YY';
// DesignStudioItem.INDD_DATE_FORMAT = 'YYYY-MM-DD';
// DesignStudioItem.DATE_NOTE_DELIMITER_START = '{date_for_designer_START}';
// DesignStudioItem.DATE_NOTE_DELIMITER_END = '{date_for_designer_END}';

// DesignStudioItem.prototype.updateDesignNoteWithEventDate = function(eventDate_moment) {
// 	const newDateSnippet = this.getDateSnippetForNotesUsingMoment(eventDate_moment),
// 		designNotesWithoutOldSnippet = this.getExistingDesignNotesWithoutDateSnippet();

// 	this.updateSpecialDesignRequest(newDateSnippet + designNotesWithoutOldSnippet);
// 	designStudio.updateDocumentListUserNotes(this);
// 	designStudio.loadSpecialDesignRequest(this);
// };

// DesignStudioItem.prototype.getDateSnippetForNotesUsingMoment = function(eventDate_moment) {
// 	return DesignStudioItem.DATE_NOTE_DELIMITER_START + ' ' + eventDate_moment.format(DesignStudioItem.DISPLAY_DATE_FORMAT) + ' ' + DesignStudioItem.DATE_NOTE_DELIMITER_END;
// };
// DesignStudioItem.prototype.getExistingDesignNotesWithoutDateSnippet = function(){
// 	let existingDesignNotes = this.userDesignNotes;
// 	if(existingDesignNotes){

// 		//Remove date snippet inside delimiter tags
// 		const oldDateInNotes = this.getDateSnippetFromDesignNotesWithoutDelimiterTags();
// 		if(notNullOrEmpty(oldDateInNotes)){
// 			existingDesignNotes = existingDesignNotes.replace(oldDateInNotes, '');
// 		}
// 		//Remove snippet start and end tags, wherever they are
// 		existingDesignNotes = replaceAll(existingDesignNotes, DesignStudioItem.DATE_NOTE_DELIMITER_START, '');
// 		existingDesignNotes = replaceAll(existingDesignNotes, DesignStudioItem.DATE_NOTE_DELIMITER_END, '');
// 	}
// 	return existingDesignNotes;
// };

// DesignStudioItem.prototype.getDateSnippetFromDesignNotesWithoutDelimiterTags = function(){
// 	if(this.userDesignNotes){
// 		const dateSnippet = this.userDesignNotes,
// 			startIndex = dateSnippet.indexOf(DesignStudioItem.DATE_NOTE_DELIMITER_START) + DesignStudioItem.DATE_NOTE_DELIMITER_START.length,
// 			endIndex = dateSnippet.indexOf(DesignStudioItem.DATE_NOTE_DELIMITER_END);

// 		if(startIndex > -1 && endIndex > -1 && startIndex < endIndex && endIndex < dateSnippet.length){
// 			//Remove date snippet inside delimiter tags
// 			return dateSnippet.substring(startIndex, endIndex);
// 		}
// 	}
// 	return null;
// };

// //Legacy date-driven calendar table in text box helper functions
// DesignStudioItem.prototype.getEventDateMomentFromNotes = function(){
// 	const currentEventDateFromNotes = this.getDateSnippetFromDesignNotesWithoutDelimiterTags();
// 	return notNullOrEmpty(currentEventDateFromNotes) ? moment(currentEventDateFromNotes) : null;
// };

// DesignStudioItem.prototype.haveExistingValidLegacyDesignRequestEventDate = function() {
// 	const dateMoment = this.getEventDateMomentFromNotes();
// 	return (dateMoment &&
// 			dateMoment.isValid() &&
// 			isNullOrEmpty(this.runSanityChecksOnEventDate(dateMoment)));

// };

// DesignStudioItem.prototype.hasLegacyDateDrivenTextBox = function(){
// 	return (this.getFirstLegacyDateDrivenTextBox() !== null);
// };

// DesignStudioItem.prototype.callClickHandlerForFirstLegacyDateDrivenTextBox = function() {
// 	const textBox = this.getFirstLegacyDateDrivenTextBox();
// 	if(textBox)
// 		textBox.handleTextClick();
// };

// DesignStudioItem.prototype.getFirstLegacyDateDrivenTextBox = function(){
// 	let dateDrivenTextBox = null;
// 	if(this.textBoxes && this.textBoxes.length > 0){
// 		for(let i = 0; i < this.textBoxes.length && !dateDrivenTextBox; i++){
// 			if(this.textBoxes[i].isLegacyDateDrivenTextBox())
// 				dateDrivenTextBox = this.textBoxes[i];
// 		}
// 	}
// 	return dateDrivenTextBox;
// };

// //Replacement date-driven calendar table in text box helper functions (no more design request, handled by IDS scripts)
// DesignStudioItem.prototype.haveExistingValidDynamicEventDate = function() {
// 	const textBox = this.getFirstDynamicDateDrivenTextBox();
// 	return !textBox.dynamicDateDrivenTextBoxValueNeeded();
// };

// DesignStudioItem.prototype.hasDynamicDateDrivenTextBox = function(){
// 	return (this.getFirstDynamicDateDrivenTextBox() !== null);
// };

// DesignStudioItem.prototype.callClickHandlerForFirstDynamicDateDrivenTextBox = function() {
// 	const textBox = this.getFirstDynamicDateDrivenTextBox();
// 	if(textBox)
// 		textBox.handleTextClick();
// };

// DesignStudioItem.prototype.getFirstDynamicDateDrivenTextBox = function(){
// 	let dateDrivenTextBox = null;
// 	if(this.textBoxes && this.textBoxes.length > 0){
// 		for(let i = 0; i < this.textBoxes.length && !dateDrivenTextBox; i++){
// 			if(this.textBoxes[i].isDynamicDateDrivenTextBox())
// 				dateDrivenTextBox = this.textBoxes[i];
// 		}
// 	}
// 	return dateDrivenTextBox;
// };

// DesignStudioItem.prototype.runSanityChecksOnEventDate = function(date_moment) {
// 	let errorMessage = null;
// 	if(!date_moment)
// 		errorMessage = 'Please choose an upcoming date.';
// 	else if(date_moment.isSameOrBefore(moment.now()))
// 		errorMessage = 'Please choose a date in the future.';
// 	else if(!date_moment.isValid())
// 		errorMessage = 'Date is not valid.';
// 	return errorMessage;
// };

// DesignStudioItem.prototype.loadCommonFontsAndInsertItemSpecificFonts = function(callback) {
// 	designStudio.richTextEditor.updateOrFetchAndUpdateFontList(callback);
// }

// DesignStudioItem.prototype.isPrintReadyTemplate = function() {
// 	return (this.productStylecode && is_999_Stylecode(this.productStylecode));
// }

// DesignStudioItem.prototype.getInkColorAttributeHTML = function(inkColor) {
// 	let colorSwatchContainer, colorSwatchName,
// 		colorSwatchFragment, colorSwatch, colorSwatchTarget;

// 	let selectedInkColor = this.getSelectedInkColor();
// 	if(_.isNull(selectedInkColor)){
// 		selectedInkColor = this.getDefaultInkColor();
// 	}

// 	colorSwatchFragment = document.createDocumentFragment();
// 	colorSwatchContainer = document.createElement("div");
// 	colorSwatchContainer.id = inkColor.id + 'Container';
// 	colorSwatchTarget = document.createElement("div");
// 	colorSwatchTarget.id = 'inkSwatch_ ' + inkColor.id;
// 	colorSwatchTarget.className = 'designColorSwatch attributeColorSwatch ' + ((inkColor.webDescription == selectedInkColor.webDescription)? 'selected' : '');
// 	colorSwatch = document.createElement("div");
// 	colorSwatch.className = inkColor.shortWebDescription.toLowerCase() + 'ink';

// 	const containerClassNames = 'designColorSwatchContainer attributeColorSwatch ' + ((inkColor.webDescription == selectedInkColor.webDescription)? 'selected' : '');
// 	colorSwatchContainer.className = containerClassNames;

// 	colorSwatchTarget.appendChild(colorSwatch);
// 	colorSwatchContainer.appendChild(colorSwatchTarget);
// 	colorSwatchName = document.createElement("span");
// 	colorSwatchName.id = inkColor.id + 'Name';
// 	colorSwatchName.className = 'designColorSwatchName';
// 	colorSwatchName.innerHTML = inkColor.webDescription;
// 	colorSwatchContainer.appendChild(colorSwatchName);
// 	colorSwatchFragment.appendChild(colorSwatchContainer);
// 	return colorSwatchFragment;
// };

// DesignStudioItem.prototype.handleInkColorClick = function (newSelectionId) {
// 	designStudio.lockInterfaceAndShowProgressSpinner();
// 	//$j('.dsDesignViews .singleView').addClass('loading');
// 	//$j('.dsArtboard .mainImage').addClass('loading');
// 	//designStudio.addLoadingAnimation('.dsDesignViews .singleView');
// 	//designStudio.addLoadingAnimation('.dsArtboard .mainImage');

// 	let selectedInkId = newSelectionId.split('_')[1],
// 		currentSelection,
// 		currentValue,
// 		newValue,
// 		selectionImprints = this.getSelectionImprints(),
// 		tempImprint;

// 	const selectedInkColorAttribute = this.getAttributeById(parseInt(selectedInkId));
// 	if(!_.isNull(selectedInkColorAttribute)){
// 		this.handleInkColorSelectionChangeUpdateImageAndRender(selectedInkColorAttribute);
// 		const addressingItem = designStudio.getAddressingItem(designStudio.currentDSItem.productStylecode.split('-')[1]);
// 		if(!_.isNull(addressingItem) && !_.isUndefined(addressingItem)){
// 			designStudio.setEnvelopeAddressingEvents(addressingItem);
// 		}
// 	}/* else {
// 		this.isModified = true;
// 		this.updateStockViews();
// 		designStudio.renderViews(this);
// 		designStudio.renderMainImage(this, designStudio.currentDSItem.getFirstVisibleViewIndex(), designStudio.handleMainImageChange);
// 	}*/
// };

// DesignStudioItem.prototype.handleInkColorSelectionChangeUpdateImageAndRender = function (selectedInkColorAttribute) {
// 	this.inkColorAttribute = selectedInkColorAttribute;
// 	this.updateSelectedAttributes();

// 	$j('.substrateSwatch').each(function(){
// 		if($j(this).get(0).id.split('_')[1] == selectedSubstrateAttribute.id){
// 			$j(this).addClass('selected');
// 			$j(this).parents('.designColorSwatchContainer').addClass('selected');
// 		} else {
// 			$j(this).removeClass('selected');
// 			$j(this).parents('.designColorSwatchContainer').removeClass('selected');
// 		}
// 	});

// 	this.isModified = true;
// 	/*if(this.isMultidocument){
// 		this.renderMultidocumentViews(function(){
// 			designStudio.updateMainImage(this);
// 			designStudio.updateViews(this);
// 		});
// 	} else {
// 		//this.updateStockViews();
// 		designStudio.renderViews(this);
// 		designStudio.renderMainImage(this, designStudio.currentDSItem.getFirstVisibleViewIndex(), designStudio.handleMainImageChange);
// 	}*/

// 	this.rerenderDocumentViews(function(){
// 		designStudio.renderViews(this);
// 		designStudio.renderMainImage(this, designStudio.currentDSItem.getFirstVisibleViewIndex(), designStudio.handleMainImageChange);
// 	});
// };

// DesignStudioItem.prototype.rerenderDocumentViews = function(dsCallback) {
// 	dsi = this;
// //	if (smallerThanC()) {
// //		idsURL += '&scale=' + (designStudio.scale * designStudio.scaleMultiplier);
// //	}

// 	const multidocumentQueue = [], viewNames = [];
// 	const productViews = this.productDSViewSet.concat(this.productViewSet);
// 	for (let i = 0, x = productViews.length; i < x; i = i + 1) {
// 		const tempView = productViews[i];
// 		if(viewNames.indexOf(tempView.scene) < 0){
// 			viewNames.push(tempView.scene);
// 			multidocumentQueue.push(i);
// 			//Example call: http://v1137-dids.magnetstreet.net/dsservices/apiV1/getDocumentView?sessionId=20141031-94DF4DDC640D0F991B7EA07CAB0718C8&documentId=304DF038428A6AC9738E668D1CEE2985&viewName=invr_design-studio_front&viewSize=th
// 			//idsURL = designStudio.baseIDSLocation + 'updateDocument?sessionId=' + this.sessionId + '&documentId=' + this.documentId + '&viewName=' + tempView.scene;
// 			idsURL = designStudio.baseIDSLocation + 'updateDocument?sessionId=' + this.sessionId + '&documentId=' + this.documentId + '&viewList=' + this.getProductDSViewSetString() + '&templateId=' + this.templateStylecode + '&saveChanges=false&exportPageRange=ALL&r=' + Math.random() + ':' + new Date().getTime();

// 			const additionalSourcesJSON = designStudio.buildAdditionalSourceJSONForItem(this);

// 			if(this.isSample && this.quantity == 1 && (designStudio.dsJSON.marketId === 517 || designStudio.dsJSON.marketId === 524)){
// 				const sampleJSON = {};
// 				sampleJSON.type = 'sample';
// 				sampleJSON.sample = 'true';
// 				if(_.isNull(additionalSourcesJSON)){
// 					sourcesJSON = {};
// 				}
// 				sourcesJSON.push(sampleJSON);
// 			}

// 			$j.ajax({
// 				url: idsURL,
// 				type: 'POST',
// 				data: 'docData=' + encodeURIComponent(JSON.stringify(this.IDSObject)) + (!_.isEmpty(additionalSourcesJSON) ? '&additionalSourceList=' + JSON.stringify(additionalSourcesJSON) : '' ),
// 				dataType: 'text'
// 			})
// 			.done(function(data) {
// 				designStudio.updateItemAndReRenderEditableAttributes(dsi);
// 			});
// 		}
// 	}
// };

// DesignStudioItem.prototype.STANDARD_WARNING_PPI = 290;
// DesignStudioItem.prototype.STANDARD_HARD_STOP_PPI = 250;
// DesignStudioItem.prototype.CUSTOM_HARD_STOP_PPI_LIST = {
// 		'TFA' : 200,
// 		'TFB' : 200
// };

// DesignStudioItem.prototype.getPhotoWarningPPI = function() {
// 	let customWarningPPI = null;
// 	if(this.getPhotoHardStopPPI() > this.STANDARD_HARD_STOP_PPI)
// 		customWarningPPI = this.getPhotoHardStopPPI() + 20;
// 	else if(this.isPrintReadyTemplate())
// 		customWarningPPI = 290;

// 	return customWarningPPI || this.STANDARD_WARNING_PPI;
// }

// DesignStudioItem.prototype.getPhotoHardStopPPI = function() {
// 	let customHardStopPPI = null;
// 	if(this.templateStylecode){
// 		const typeCode = this.templateStylecode.split('-')[0];
// 		customHardStopPPI = this.CUSTOM_HARD_STOP_PPI_LIST[typeCode];
// 	}
// 	return customHardStopPPI || this.STANDARD_HARD_STOP_PPI;
// }

// DesignStudioItem.prototype.showLogoOnBackside = function() {
// 	return designStudio.showLogoOnLayoutTypeIds.indexOf(this.typeId) > -1;
// };

// DesignStudioItem.prototype.revertBacksideDesign = function() {
// 	dsi = this;

// 	//layout = 'layout_horizontal_3ImagesTop_3ImagesBottom';
// 	const templateStylecode = dsi.templateStylecode;

// 	//$j('.dsArtboard .mainImage').addClass('loading');
// 	//designStudio.addLoadingAnimation('.dsArtboard .mainImage');
// 	designStudio.lockInterfaceAndShowProgressSpinner();

// 	idsURL = designStudio.baseIDSLocation + 'applyTemplateToDesign?sessionId=' + this.sessionId + '&documentId=' + this.documentId  + '&viewList=' + this.getProductDSViewSetString() + '&page=2&revertToTemplate=true&templateId=' + templateStylecode + '&showLogoOnBackside=' + this.showLogoOnBackside() + '&saveChanges=true&scale=200&r=' + Math.random() + ':' + new Date().getTime();

// 	$j.ajax({
// 		url: idsURL,
// 		type: 'POST',
// 		timeout: 300000,
// 		async: true
// 	})
// 	.done(function(data) {
// 		dsi.updateLayoutCallback('back', data);
// 	})
// 	.fail(function(data){
// 		console.log('error data from server', data);
// 	});
// };

// DesignStudioItem.prototype.updateBacksideDesign = function(pattern) {
// 	dsi = this;

// 	//layout = 'layout_horizontal_3ImagesTop_3ImagesBottom';
// 	const templateStylecode = dsi.templateStylecode;

// 	if(designStudio.validateBacksideDesign(pattern)){
// 		//$j('.dsArtboard .mainImage').addClass('loading');
// 		//designStudio.addLoadingAnimation('.dsArtboard .mainImage');
// 		designStudio.lockInterfaceAndShowProgressSpinner();

// 		idsURL = designStudio.baseIDSLocation + 'applyTemplateToDesign?sessionId=' + this.sessionId + '&documentId=' + this.documentId  + '&viewList=' + this.getProductDSViewSetString() + '&pattern=' + pattern + '&templateId=' + templateStylecode + '&page=2&showLogoOnBackside=' + this.showLogoOnBackside() + '&revertToTemplate=false&saveChanges=true&scale=200&r=' + Math.random() + ':' + new Date().getTime();

// 		$j.ajax({
// 			url: idsURL,
// 			type: 'POST',
// 			timeout: 300000,
// 			async: true
// 		})
// 		.done(function(data) {
// 			dsi.updateLayoutCallback('back', data);
// 		})
// 		.fail(function(data){
// 			console.log('error data from server', data);
// 		});
// 	}
// };

// /*
// DesignStudioItem.prototype.updateBacksideDesignCallback = function() {
// 	var dsi = this;
// 	this.getDocumentFromIDSAfterBacksideUpdate()
// 	.then(function(data){
// 		dsi.updatedBaselineJSON = JSON.parse(JSON.stringify(data));
// 		return dsi.mergeFromIDS(data, false)
// 	})
// 	.then(function(imageMerged){
// 		var imageIndex = dsi.getBackViewIndex();
// 		if(imageIndex > -1){
// 			designStudio.currentViewIndex = imageIndex;
// 		}
// 		if(imageMerged){
// 			dsi.handleImageChange(null, designStudio.currentViewIndex, function(){
// 				designStudio.renderMainImage(dsi, designStudio.currentViewIndex, designStudio.handleMainImageChange);
// 				designStudio.navigation.setSubNavigationToPosition(designStudio.currentViewIndex);
// 				designStudio.updateItemAndReRenderEditableAttributes(dsi);
// 			});
// 		} else {
// 			dsi.saveToIDS('ALL', function(){
// 				designStudio.renderMainImage(dsi, designStudio.currentViewIndex, designStudio.handleMainImageChange);
// 				designStudio.navigation.setSubNavigationToPosition(designStudio.currentViewIndex);
// 				designStudio.updateItemAndReRenderEditableAttributes(dsi);
// 			});
// 		}
// 	});
// };
// */

// DesignStudioItem.prototype.updateBacksideLayout = function(layout) {
// 	dsi = this;
// //	if (smallerThanC()) {
// //		idsURL += '&scale=' + (designStudio.scale * designStudio.scaleMultiplier);
// //	}

// 	//layout = 'layout_horizontal_3ImagesTop_3ImagesBottom';
// 	const templateStylecode = dsi.templateStylecode;

// 	if(designStudio.validateBacksideLayout(layout)){
// 		//$j('.dsArtboard .mainImage').addClass('loading');
// 		//designStudio.addLoadingAnimation('.dsArtboard .mainImage');
// 		designStudio.lockInterfaceAndShowProgressSpinner();

// 		idsURL = designStudio.baseIDSLocation + 'applyTemplateToDesign?sessionId=' + this.sessionId + '&documentId=' + this.documentId  + '&viewList=' + this.getProductDSViewSetString() + '&layout=' + layout + '&templateId=' + templateStylecode + '&page=2&showLogoOnBackside=' + this.showLogoOnBackside() + '&revertToTemplate=false&saveChanges=true&scale=200&r=' + Math.random() + ':' + new Date().getTime();

// 		$j.ajax({
// 			url: idsURL,
// 			type: 'POST',
// 			timeout: 300000,
// 			async: true
// 		})
// 		.done(function(data) {
// 			dsi.updateLayoutCallback('back', data);
// 		})
// 		.fail(function(data){
// 			console.log('error data from server', data);
// 		});
// 	}
// };

// DesignStudioItem.prototype.revertFrontsideDesign = function() {
// 	dsi = this;

// 	//layout = 'layout_horizontal_3ImagesTop_3ImagesBottom';
// 	const templateStylecode = dsi.templateStylecode;

// 	//$j('.dsArtboard .mainImage').addClass('loading');
// 	//designStudio.addLoadingAnimation('.dsArtboard .mainImage');
// 	designStudio.lockInterfaceAndShowProgressSpinner();

// 	idsURL = designStudio.baseIDSLocation + 'applyTemplateToDesign?sessionId=' + this.sessionId + '&documentId=' + this.documentId  + '&viewList=' + this.getProductDSViewSetString() + '&page=1&revertToTemplate=true&templateId=' + templateStylecode + '&showLogoOnBackside=' + this.showLogoOnBackside() + '&saveChanges=true&scale=200&r=' + Math.random() + ':' + new Date().getTime();

// 	$j.ajax({
// 		url: idsURL,
// 		type: 'POST',
// 		timeout: 300000,
// 		async: true
// 	})
// 	.done(function(data) {
// 		dsi.updateLayoutCallback('back', data);
// 	})
// 	.fail(function(data){
// 		console.log('error data from server', data);
// 	});
// };

// DesignStudioItem.prototype.updateFrontsideLayout = function(layout) {
// 	dsi = this;
// //	if (smallerThanC()) {
// //		idsURL += '&scale=' + (designStudio.scale * designStudio.scaleMultiplier);
// //	}

// 	//layout = 'layout_horizontal_3ImagesTop_3ImagesBottom';
// 	const templateStylecode = dsi.templateStylecode;

// 	if(designStudio.validateFrontsideLayout(layout)){
// 		//$j('.dsArtboard .mainImage').addClass('loading');
// 		//designStudio.addLoadingAnimation('.dsArtboard .mainImage');
// 		designStudio.lockInterfaceAndShowProgressSpinner();

// 		idsURL = designStudio.baseIDSLocation + 'applyTemplateToDesign?sessionId=' + this.sessionId + '&documentId=' + this.documentId  + '&viewList=' + this.getProductDSViewSetString() + '&layout=' + layout + '&templateId=' + templateStylecode + '&page=1&showLogoOnBackside=false&revertToTemplate=false&saveChanges=true&scale=200&r=' + Math.random() + ':' + new Date().getTime();

// 		$j.ajax({
// 			url: idsURL,
// 			type: 'POST',
// 			timeout: 300000,
// 			async: true
// 		})
// 		.done(function(data) {
// 			dsi.updateLayoutCallback('front', data);
// 		})
// 		.fail(function(data){
// 			console.log('error data from server', data);
// 		});
// 	}
// };

// DesignStudioItem.prototype.updateLayoutCallback = function(viewName, data) {
// 	const dsi = this;
// 	let updateWasSuccessful = false;
// 	for(let i = 0, x = data.length; i < x; i = i + 1){
// 		if(data[i].type.toLowerCase() == 'documentsaved'){
// 			updateWasSuccessful = true;
// 			break;
// 		}
// 	}

// 	if(updateWasSuccessful){
// 		this.getDocumentFromIDSAfterBacksideUpdate()
// 		.then(function(data){
// 			dsi.updatedBaselineJSON = JSON.parse(JSON.stringify(data));
// 			return dsi.mergeFromIDS(data, true)
// 		})
// 		.then(function(imageMerged){
// 			let imageIndex = -1;
// 			if(viewName.toLowerCase() == 'front'){
// 				imageIndex = dsi.getFrontViewIndex();
// 			} else {
// 				imageIndex = dsi.getBackViewIndex();
// 			}
// 			if(imageIndex > -1){
// 				designStudio.currentViewIndex = imageIndex;
// 			}
// 			if(imageMerged){
// 				dsi.handleImageChange(null, designStudio.currentViewIndex, function(){
// 					designStudio.renderMainImage(dsi, designStudio.currentViewIndex, designStudio.handleMainImageChange);
// 					designStudio.navigation.setSubNavigationToPosition(designStudio.currentViewIndex);
// 					designStudio.updateItemAndReRenderEditableAttributes(dsi);
// 					designStudio.unlockInterfaceAndRemoveProgressSpinner();
// 				});
// 			} else {
// 				dsi.saveToIDS('ALL', function(){
// 					designStudio.renderMainImage(dsi, designStudio.currentViewIndex, designStudio.handleMainImageChange);
// 					designStudio.navigation.setSubNavigationToPosition(designStudio.currentViewIndex);
// 					designStudio.updateItemAndReRenderEditableAttributes(dsi);
// 					designStudio.unlockInterfaceAndRemoveProgressSpinner();
// 				});
// 			}
// 		});
// 	} else {
// 		//designStudio.removeLoadingAnimation('.dsArtboard .mainImage');
// 		designStudio.unlockInterfaceAndRemoveProgressSpinner();
// 		HotTub.dialog.errorPopupWithText('Whoops...', 'There was an error updating the backside.', true);
// 	}
// };

// DesignStudioItem.prototype.getDocumentFromIDSAfterBacksideUpdate = function(dsCallback) {
// 	//Example of call: http://www.trulyengaging.com/designtools/main/ajaxGetDTDoc/dtSessionId/20141009-DFA56405BA3511FC2F2686462AF51F87/dtDocumentId/47E64E99DA0E4836EC4B959720648943/dtCanvasHeight/502/dtCanvasWidth/922/dtIs3DProduct/true/dtTemplateId/A-10102/r/1413828140593:0.21440702211111784/initialColorPalette/null
// 	return new Promise(function(resolve, reject) {
// 		var dsi = designStudio.currentDSItem;
// 		const skipImageRender = (designStudio.allowAdvancedEditing && dsi.isLockedForImprintEditing) ? 'true' : 'false';
// 		const productViewString = dsi.getProductDSViewSetString();
// 		const templateStylecode = dsi.templateStylecode;
// 		var idsURL = designStudio.baseIDSLocation + 'getDocument?sessionId=' + dsi.sessionId + '&documentId=' + dsi.documentId + '&viewList=' + productViewString + '&templateId=' + templateStylecode + '&skipImageRender=' + skipImageRender + '&scale=200&useWorkingFile=true&r=' + Math.random() + ':' + new Date().getTime(),
// 			dsi = dsi;

// 		if(skipImageRender != 'false' && dsi.colorPalette !== undefined && dsi.colorPalette !== null && dsi.colorPalette !== '' && (dsi.colorPalette.toLowerCase().indexOf('foil') > 0 || dsi.colorPalette.toLowerCase().indexOf('varnish') > 0)){
// 			idsURL += '&exportOverprintMasks=true';
// 		}

// 		if(dsi.hasVarnish()){
// 			idsURL += '&displayVarnish=true';
// 		}

// 		const variation = dsi.getSelectedVariationAttribute();
// 		if(!_.isNull(variation) && !_.isUndefined(variation)){
// 			idsURL += '&variation=' + variation.template;
// 		}

// 		dsi.getDocumentCallCount++;

// 		$j.ajax({
// 			method: 'GET',
// 			url: idsURL,
// 			timeout: 300000,
// 			async: true
// 		})
// 		.done(function(data) {
// 			dsi.isInitialized = true;
// 			dsi.isWorking = false;
// 			dsi.getDocumentCallCount = 0;
// 			resolve(data);
// 		})
// 		.fail(function(data) {
// 			MSGA.designStudio3.failedToGetDocument(dsi.productStylecode);
// 			dsi.isInitialized = false;
// 			dsi.isWorking = false;
// 			if(dsi.getDocumentCallCount < 6){
// 				setTimeout(function(){ dsi.getDocumentFromIDS(dsCallback); }, 1000);
// 			} else {
// 				if(designStudio.dsItems[0].documentId == dsi.documentId){
// 					HotTub.dialog.infoPopupWithText(
// 						"We're having some trouble",
// 						"Something went wrong loading Design Studio.  Please try again or save your work to your account.",
// 						true,
// 						'OK',
// 						function(){
// 							HotTub.dialog.handleClose();
// 						});
// 				} else {
// 					HotTub.dialog.infoPopupWithText(
// 						"We're having some trouble",
// 						"Something went wrong loading this item.  Please try again or save your work to your account.",
// 						true,
// 						'OK',
// 						function(){
// 							HotTub.dialog.handleClose();
// 							designStudio.navigation.goToPreviousStep();
// 						});

// 				}
// 			}
// 		});
// 	});
// };

// DesignStudioItem.prototype.mergeFromIDS = function(dsDocumentJSON, mergeColors) {
// 	return new Promise(function(resolve, reject) {
// 		const dsi = designStudio.currentDSItem;
// 		dsi.imageBoxesToMerge = [];

// 		//Really shouldn't need this if text tags are collapsing and expanding correctly. No tags should disappear after an update.
// 		if(!_.isEmpty(this.IDSObject) && this.IDSObject.textTags){
// 			//Text tags shouldn't change based on response data once defined for an item
// 			dsDocumentJSON.textTags = this.IDSObject.textTags;
// 		}
// 		dsi.IDSObject = dsDocumentJSON;

// 		dsi.mergeTextBoxes()
// 		.then(function(result){
// 			return dsi.mergeColorSwatches(mergeColors);
// 		})
// 		.then(function(result){
// 			return dsi.mergeImageBoxes();
// 		})
// 		.then(function(result){
// 			designStudio.renderColorSwatches(dsi);
// 			designStudio.setColorEvents(dsi);

// 			dsi.updateIDSObject();
// 			dsi.updateViews();
// 			dsi.orderEditableBoxes();
// 			dsi.trackUneditedElements = dsi.IDSObject.hasBaselineDoc || false;
// 			if(designStudio.mediaLibrary){
// 				designStudio.mediaLibrary.fetchMediaDataForItem(this);
// 			}
// 			designStudio.firstItemLoaded = true;
// 		})
// 		.then(function(result){
// 			return dsi.mergeImagesInImageBoxes()
// 		})
// 		.then(function(result){
// 			let imageMerged = false;
// 			$j.each(result, function(index, result){
// 				if(result.value == true){
// 					imageMerged = true;
// 				}
// 			});

// 			resolve(imageMerged);
// 		});
// 	});
// };

// DesignStudioItem.prototype.mergeColorSwatches = function(mergeColors) {
// 	return new Promise(function(resolve, reject) {
// 		let tempColorSwatch, dsItem = designStudio.currentDSItem;
// 		const addeds = [];
// 		//Design Color Swatches
// 		const mergedColorList = [], originalColorSwatches = dsItem.colorSwatches;
// 		for (var i = 0, x = dsItem.IDSObject.swatches.length; i < x; i = i + 1) {
// 			tempColorSwatch = dsItem.IDSObject.swatches[i];
// 			const existingColor = originalColorSwatches.find(function(colorSwatch){return colorSwatch.swatchName.toLowerCase() == tempColorSwatch.swatchName.toLowerCase()});
// 			if(mergeColors && !_.isNull(existingColor) && !_.isUndefined(existingColor)){
// 				mergedColorList.push(existingColor);
// 			} else {
// 				mergedColorList.push(new DesignStudioItemColorSwatch(dsItem.productId, tempColorSwatch.id, tempColorSwatch.place, tempColorSwatch.swatchName, tempColorSwatch.colorSpace, Math.round(tempColorSwatch.redValue), Math.round(tempColorSwatch.greenValue), Math.round(tempColorSwatch.blueValue), Math.round(tempColorSwatch.cyanValue), Math.round(tempColorSwatch.magentaValue), Math.round(tempColorSwatch.yellowValue), Math.round(tempColorSwatch.blackValue), tempColorSwatch.modified, tempColorSwatch.spotValue, tempColorSwatch.foilable));
// 			}
// 		}

// 		for ( var i = 0; i < dsItem.IDSObject.textBoxes.length; i++) {
// 			const textBox = dsItem.IDSObject.textBoxes[i];
// 			if(!textBox.lockColor && !DesignStudioItemText.isLegacyDateDrivenTextBoxTagName(textBox.tagName) && !DesignStudioItemText.isDynamicDateDrivenTextBox_legacyValueCheck(textBox.contentType, dsItem.haveExistingValidLegacyDesignRequestEventDate())){
// 				for ( let j = 0; j < textBox.contentFormatted.length; j++) {
// 					const contentFormatted = textBox.contentFormatted[j];
// 					for ( let k = 0; k < contentFormatted.textStyleRanges.length; k++) {
// 						const tsr = contentFormatted.textStyleRanges[k];
// 						const colorKey =  Math.round(tsr.fillColorC)+'-'+Math.round(tsr.fillColorM)+'-'+Math.round(tsr.fillColorY)+'-'+Math.round(tsr.fillColorK)+'-'+tsr.fillColorSpace + (textBox.foilable ? '-foilable' : '-standard');
// 						const hasText = ((tsr.contents+'').replace(/(13)/g,'').replace(/,/g,'').trim().length > 0);

// 						const charArray = (tsr.contents + '').split(',');
// 						let editableTextPreview = String.fromCharCode.apply(null, charArray).trim();
// 						const previewLimit = 35;
// 						editableTextPreview = (editableTextPreview.length > previewLimit) ? editableTextPreview.substring(0,previewLimit) : editableTextPreview;
// 						if(hasHTMLCharsNeedingReplacement(editableTextPreview))
// 							editableTextPreview = htmlCharReplace(editableTextPreview);

// 						const overprintModifier = (textBox.foilable ? '_overprintAvailable' : '_noOverprint');
// 						if(hasText && addeds.indexOf(colorKey + overprintModifier) > -1){
// 							//update name on matching color swatch
// 							for(let l = 0; l < mergedColorList.length; l++){
// 								const cs = mergedColorList[l];
// 								const moreTextPlaceholder = '... etc.';
// 								if((''+cs.id).indexOf(colorKey) > -1 && cs.swatchName.split('<span').length - 1 < 2){
// 									cs.swatchName += '<span class="textBlockDisplayName secondThirdLine">'+editableTextPreview + '</span>';
// 								} else if (cs.swatchName.indexOf('secondThirdLine') > 0 && cs.swatchName.split(moreTextPlaceholder).length < 2) {
// 									cs.swatchName += '<span class="textBlockDisplayName secondThirdLine">'+moreTextPlaceholder+'</span>';
// 								}
// 							}
// 						} else if(hasText){
// 							//Haven't seen this color yet, add it
// 							const name = '<span class="textBlockDisplayName">'+editableTextPreview+'</span>';
// 							mergedColorList.push(new DesignStudioItemColorSwatch(dsItem.productId, 'textColor'+colorKey, contentFormatted.place, name, tsr.fillColorSpace, Math.round(tsr.fillColorR), Math.round(tsr.fillColorG), Math.round(tsr.fillColorB), Math.round(tsr.fillColorC), Math.round(tsr.fillColorM), Math.round(tsr.fillColorY), Math.round(tsr.fillColorK), textBox.modified, tsr.fillSpotValue, textBox.foilable));
// 							addeds.push(colorKey + overprintModifier);
// 						}
// 					}
// 				}
// 			}
// 		}
// 		dsItem.colorSwatches = mergedColorList;
// 		resolve('success');
// 	});
// };

// DesignStudioItem.prototype.mergeTextBoxes = function() {
// 	return new Promise(function(resolve, reject) {
// 		var existingTextBox,
// 			tempTextBox,
// 			tempFormattedContent,
// 			tempTextStyleRange,
// 			dsItem = designStudio.currentDSItem;

// 		if(dsItem.IDSObject.textBoxes.length > 0){
// 			const textBoxCopy = Object.assign([], dsItem.textBoxes);
// 			dsItem.textBoxes = [];
// 			for (var i = 0, x = dsItem.IDSObject.textBoxes.length; i < x; i = i + 1) {
// 				var idToMatch = dsItem.IDSObject.textBoxes[i].id;
// 				var tagNameToMatch = dsItem.IDSObject.textBoxes[i].tagName;
// 				var nameToMatch = dsItem.IDSObject.textBoxes[i].name;
// 				//console.log('idToMatch', idToMatch, tagNameToMatch);
// 				var existingTextBox = textBoxCopy.find(function(textBox){ return ((textBox.id == idToMatch) || (!_.isNull(textBox.tagName) && !_.isUndefined(textBox.tagName) && textBox.tagName != '' && textBox.tagName == tagNameToMatch))});
// 				//console.log('existingTextBox', existingTextBox);

// 				if(_.isNull(existingTextBox) || _.isUndefined(existingTextBox)){
// 					//console.log('did not find existingTextBox.  look based on name');
// 					existingTextBox = textBoxCopy.find(function(textBox){ return (!_.isNull(textBox.name) && !_.isUndefined(textBox.name) && textBox.name != '' && textBox.name == nameToMatch)});
// 				}

// 				if(_.isNull(existingTextBox) || _.isUndefined(existingTextBox) || (!_.isNull(existingTextBox) && !_.isUndefined(existingTextBox))){
// 					tempTextBox = dsItem.IDSObject.textBoxes[i];
// 					const displayNameOverride = null;

// 					if(_.isNull(existingTextBox) || _.isUndefined(existingTextBox) || (!_.isNull(existingTextBox) && !_.isUndefined(existingTextBox) && !existingTextBox.modified)){
// 						//console.log('there is an existing text box to merge into', existingTextBox);
// 						if (tempTextBox.contentFormatted !== undefined && tempTextBox.contentFormatted !== null && tempTextBox.contentFormatted !== '' && tempTextBox.contentFormatted.length > 0) {
// 							for (var j = 0, y = tempTextBox.contentFormatted.length; j < y; j = j + 1) {
// 								tempFormattedContent = tempTextBox.contentFormatted[j];
// 								if (tempFormattedContent.textStyleRanges !== undefined && tempFormattedContent.textStyleRanges !== null && tempFormattedContent.textStyleRanges !== '' && tempFormattedContent.textStyleRanges.length > 0) {
// 									for (let k = 0, z = tempFormattedContent.textStyleRanges.length; k < z; k = k + 1) {
// 										tempTextStyleRange = tempFormattedContent.textStyleRanges[k];
// 										tempTextStyleRange.pointSize = Math.round(tempTextStyleRange.pointSize * 100)/100;
// 										tempFormattedContent.textStyleRanges[k] = new DesignStudioItemTextStyleRange(tempTextStyleRange.contents, tempTextStyleRange.pointSize, tempTextStyleRange.font, tempTextStyleRange.leading, tempTextStyleRange.tracking, tempTextStyleRange.capitalization, tempTextStyleRange.otf, tempTextStyleRange.baselineShift, tempTextStyleRange.fillColorSpace,
// 												tempTextStyleRange.fillColorR, tempTextStyleRange.fillColorG, tempTextStyleRange.fillColorB, tempTextStyleRange.fillColorC, tempTextStyleRange.fillColorM, tempTextStyleRange.fillColorY, tempTextStyleRange.fillColorK, tempTextStyleRange.fillSpotValue);
// 									}
// 								}
// 								tempTextBox.contentFormatted[j] = new DesignStudioItemFormattedContent(tempFormattedContent.justification, tempFormattedContent.textStyleRanges);
// 							}
// 						}

// 						const existingErrors = dsItem.itemErrors;
// 						var textItemErrors = undefined;
// 						if(existingErrors && existingErrors.length > 0){
// 							for(var j = 0; j < existingErrors.length; j++){
// 								const errorTypeCode = existingErrors[j][tempTextBox.name];
// 								if(errorTypeCode && !isHiddenFromUserErrorCode(errorTypeCode)){
// 									if(!textItemErrors) textItemErrors = [];
// 									textItemErrors.push(errorTypeCode);
// 								}
// 							}
// 						}
// 					}

// 					dsItem.textBoxes[i] = new DesignStudioItemText(dsItem, tempTextBox.id, tempTextBox.name, tempTextBox.tagName, tempTextBox.page, tempTextBox.place, tempTextBox.rotationAngle, tempTextBox.verticalAlignment, tempTextBox.top, tempTextBox.left, tempTextBox.bottom, tempTextBox.right,
// 							tempTextBox.modified, tempTextBox.lockColor, tempTextBox.lockFontFace, tempTextBox.lockFontSize, tempTextBox.minFontSize, tempTextBox.lockFontAlignment, tempTextBox.lockVerticalAlignment, tempTextBox.lockLeading, tempTextBox.lockEditing, tempTextBox.contentFormatted, tempTextBox.contentType, tempTextBox.foilable, tempTextBox.fillColorR, tempTextBox.fillColorG, tempTextBox.fillColorB, tempTextBox.fillColorC, tempTextBox.fillColorM, tempTextBox.fillColorY, tempTextBox.fillColorK, displayNameOverride, i, textItemErrors);

// 					if(!_.isNull(existingTextBox) && !_.isUndefined(existingTextBox) && existingTextBox.modified){
// 						dsItem.textBoxes[i].contentFormatted = existingTextBox.contentFormatted;
// 						dsItem.textBoxes[i].modified = true;
// 						dsItem.textBoxes[i].fillColorR = existingTextBox.fillColorR;
// 						dsItem.textBoxes[i].fillColorG = existingTextBox.fillColorG;
// 						dsItem.textBoxes[i].fillColorB = existingTextBox.fillColorB;
// 						dsItem.textBoxes[i].fillColorC = existingTextBox.fillColorC;
// 						dsItem.textBoxes[i].fillColorM = existingTextBox.fillColorM;
// 						dsItem.textBoxes[i].fillColorY = existingTextBox.fillColorY;
// 						dsItem.textBoxes[i].fillColorK = existingTextBox.fillColorK;
// 					}

// 					//set modified attribute if text box contains imprint text
// 					if(designStudio.dsTextImprints && designStudio.dsTextImprints.textImprintsForm && !dsItem.isLockedForImprintEditing){//always do dsItem? or just when locked?
// 						var textPreview = dsItem.textBoxes[i].getFlattenedPlainTextContents();
// 						if(isNullOrEmpty(textPreview) || textPreview.indexOf('(empty line') > -1){
// 							dsItem.textBoxes[i].modified = true;
// 						} else {
// 							const formData = designStudio.dsTextImprints.textImprintsForm.formData;
// 							if(formData){
// 								var currentDSItem = dsItem;
// 								$j.each( formData, function( index, formItemData ) {
// 									if(notNullOrEmpty(formItemData.value) && (textPreview.indexOf(formItemData.value.substring(0,10)) > -1 || textPreview.indexOf('(text empty)') > -1)){
// 										currentDSItem.textBoxes[i].modified = true;
// 									}
// 								});
// 							}
// 						}
// 					}
// 				}
// 			}
// 		} else {
// 			dsItem.textBoxes = [];
// 		}

// 		if(!_.isNull(dsItem.textBoxes) && !_.isUndefined(dsItem.textBoxes) && !_.isNull(dsItem.IDSObject.textBoxes) && !_.isUndefined(dsItem.IDSObject.textBoxes) && dsItem.textBoxes.length > dsItem.IDSObject.textBoxes.length){
// 			dsItem.textBoxes.splice(dsItem.IDSObject.textBoxes.length);
// 		}

// 		resolve('success');
// 	});
// };

// DesignStudioItem.prototype.mergeImageBoxes = function() {
// 	let imagePromises = [],
// 		existingImageBox,
// 		tempImageBox,
// 		mergedImage = false,
// 		dsItem = designStudio.currentDSItem;

// 	if(dsItem.IDSObject.imageBoxes.length > 0){
// 		const imageBoxCopy = Object.assign([], dsItem.imageBoxes);
// 		dsItem.imageBoxes = [];
// 		for (var i = 0, x = dsItem.IDSObject.imageBoxes.length; i < x; i = i + 1) {
// 			imagePromises.push(new Promise(function(resolve, reject) {
// 				const nameToMatch = dsItem.IDSObject.imageBoxes[i].tagName, tagName = dsItem.IDSObject.imageBoxes[i].tagName;
// 				const existingImageBox = imageBoxCopy.find(function(imageBox){ return imageBox.tagName == nameToMatch});
// 				if(tagName.indexOf('qr_code') == -1 && (!_.isNull(existingImageBox) && !_.isUndefined(existingImageBox))){
// 					const currentImageBox = existingImageBox;
// 					existingImageName = currentImageBox.imageName;

// 					//dsItem.imageBoxes[i] = null;
// 					dsi.imageBoxesToMerge.push(existingImageBox);
// 				}

// 				if(_.isNull(existingImageBox) || _.isUndefined(existingImageBox) || (!_.isNull(existingImageBox) && !_.isUndefined(existingImageBox))){
// 					tempImageBox = dsItem.IDSObject.imageBoxes[i];
// 					const existingErrors = dsItem.itemErrors;
// 					let imageItemErrors = undefined;
// 					if(existingErrors && existingErrors.length > 0){
// 						for(let j = 0; j < existingErrors.length; j++){
// 							const errorTypeCode = existingErrors[j][tempImageBox.name];
// 							if(errorTypeCode && !isHiddenFromUserErrorCode(errorTypeCode)){
// 								if(!imageItemErrors) imageItemErrors = [];
// 								imageItemErrors.push(errorTypeCode);
// 							}
// 						}
// 					}
// 					/*
// 					if(!_.isNull(existingImageBox) && !_.isUndefined(existingImageBox)){
// 						tempImageBox = existingImageBox;
// 					}
// 					*/
// 					dsItem.imageBoxes[i] = new DesignStudioItemImage(dsItem, tempImageBox.name, tempImageBox.page, tempImageBox.place, tempImageBox.tagName, tempImageBox.type, tempImageBox.contentType, tempImageBox.hzAlign, tempImageBox.vtAlign, tempImageBox.rotationAngle, tempImageBox.top, tempImageBox.left, tempImageBox.bottom, tempImageBox.right, tempImageBox.imageRotationAngle, tempImageBox.imageTop, tempImageBox.imageLeft, tempImageBox.imageBottom, tempImageBox.imageRight,
// 							tempImageBox.defaultImageTop, tempImageBox.defaultImageLeft, tempImageBox.defaultImageBottom, tempImageBox.defaultImageRight, ((!_.isNull(tempImageBox.imageName) && !_.isUndefined(tempImageBox.imageName))? true : false), tempImageBox.imagePixelWidth, tempImageBox.imagePixelHeight, tempImageBox.imageName, tempImageBox.pageNumber,
// 							tempImageBox.contrast, tempImageBox.brightness, tempImageBox.saturation, tempImageBox.hidden, imageItemErrors);

// 					if(dsItem.imageBoxes[i].hasSuspiciousRotationAngle()){
// 						MSGA.designStudio3.logSuspiciousRotationAngle(dsItem.productStylecode);
// 					}

// 					/*
// 					if(!_.isNull(dsItem.imageBoxes) && !_.isUndefined(dsItem.imageBoxes) && !_.isNull(dsItem.IDSObject.imageBoxes) && !_.isUndefined(dsItem.IDSObject.imageBoxes) && dsItem.imageBoxes.length > dsItem.IDSObject.imageBoxes.length){
// 						dsItem.imageBoxes.splice(dsItem.IDSObject.imageBoxes.length);
// 					}
// 					*/
// 					resolve(false);
// 				} else {
// 					/*
// 					if(!_.isNull(dsItem.imageBoxes) && !_.isUndefined(dsItem.imageBoxes) && !_.isNull(dsItem.IDSObject.imageBoxes) && !_.isUndefined(dsItem.IDSObject.imageBoxes) && dsItem.imageBoxes.length > dsItem.IDSObject.imageBoxes.length){
// 						dsItem.imageBoxes.splice(dsItem.IDSObject.imageBoxes.length);
// 					}
// 					*/
// 					resolve(false);
// 				}
// 			}));
// 		}
// 	} else {
// 		dsItem.imageBoxes = [];
// 	}

// 	return Promise.allSettled(imagePromises);
// };

// DesignStudioItem.prototype.mergeImagesInImageBoxes = function() {
// 	let mergePromises = [],
// 		existingImageBox,
// 		newImageBox,
// 		dsItem = designStudio.currentDSItem;

// 	for (var i = 0, x = dsItem.imageBoxes.length; i < x; i = i + 1) {
// 		mergePromises.push(new Promise(function(resolve, reject) {
// 			let nameToMatch = dsItem.imageBoxes[i].tagName,
// 				existingImageName = '';
// 			const existingImageBox = dsi.imageBoxesToMerge.find(function(imageBox){ return imageBox.tagName == nameToMatch});
// 			if((!_.isNull(existingImageBox) && !_.isUndefined(existingImageBox))){
// 				const currentImageBox = existingImageBox;
// 				existingImageName = currentImageBox.imageName;
// 			}

// 			if(!_.isNull(existingImageBox) && !_.isUndefined(existingImageBox)){
// 				newImageBox = dsItem.imageBoxes[i];

// 				if(!_.isNull(existingImageName) && !_.isUndefined(existingImageName) && existingImageName != ''){
// 					newImageBox.imageName = existingImageName;

// 					const sourceImageData = existingImageBox.getPositionData();
// 					newImageBox.imageCurrentPixelHeight = (sourceImageData.height / designStudio.scaleMultiplier);
// 					newImageBox.imageCurrentPixelWidth = (sourceImageData.width / designStudio.scaleMultiplier);
// 					newImageBox.imageRotationAngle = existingImageBox.imageRotationAngle;

// 					newImageBox.imageNativePixelWidth = existingImageBox.imageNativePixelWidth;
// 					newImageBox.imageNativePixelHeight = existingImageBox.imageNativePixelHeight;

// 					if(existingImageName){
// 						newImageBox.setInitialImagePosition(newImageBox.getPositionData(), true);
// 					}
// 						resolve(true);
// 				} else {
// 					resolve(false);
// 				}
// 			} else {
// 				resolve(false);
// 			}
// 		}));
// 	}
// 	return Promise.allSettled(mergePromises);
// };

// DesignStudioItem.prototype.getOrientation = function() {
// 	if(this.views.length > 0){
// 		for(let i = 0, x = this.views.length; i < x; i = i + 1){
// 			const view = this.views[i];
// 			if(view.sceneName.indexOf('_hz_') > 0){
// 				//Horizontal Layout
// 				return 'hz';
// 			} else if(view.sceneName.indexOf('_vt_') > 0){
// 				//Vertical Layout
// 				return 'vt';
// 			} else {
// 				//Don't know, so continue
// 			}
// 		}
// 		return null;
// 	}
// };

// DesignStudioItem.prototype.getFrontsideLayouts = function() {
// 	const itemOrientation = this.getOrientation(), dsi = this, layouts = [], sortedLayouts = {};
// 	if(!_.isNull(this.availableAttributes.other) && !_.isUndefined(this.availableAttributes.other) && this.availableAttributes.other.length > 0){
// 		for(let i = 0, x = this.availableAttributes.other.length; i < x; i = i + 1){
// 			const attribute = this.availableAttributes.other[i];
// 			if(!_.isNull(attribute.groupWebDescription) && !_.isUndefined(attribute.groupWebDescription) && attribute.groupWebDescription.toLowerCase() == 'frontside layout'){
// 				layouts.push(attribute);
// 			}
// 		}
// 	}

// 	if(layouts.length > 0){
// 		const qrCode = [], noPhoto = [], onePhoto = [], twoPhoto = [], threePhoto = [], fourPhoto = [];
// 		$j.each(layouts, function(index, layout){
// 			if((designStudio.currentDSItem.typeCode == 'INVF' || designStudio.currentDSItem.typeCode == 'INVG' || designStudio.currentDSItem.typeCode == 'RPA' || _.isNull(itemOrientation) || (!_.isNull(itemOrientation) && layout.description.indexOf(itemOrientation) > -1))){
// 				if(layout.description.indexOf('qrTemplate') > -1){
// 					qrCode.push(layout);
// 				} else {
// 					let numPhotos = 0;
// 					if(layout.description.indexOf('_graphics') > -1){
// 						numPhotos = parseInt(layout.description.split('_graphics')[1].substring(0,1));
// 						switch(numPhotos){
// 							case 0:
// 								noPhoto.push(layout);
// 								break;
// 							case 1:
// 								onePhoto.push(layout);
// 								break;
// 							case 2:
// 								twoPhoto.push(layout);
// 								break;
// 							case 3:
// 								threePhoto.push(layout);
// 								break;
// 							default:
// 								fourPhoto.push(layout);
// 								break;
// 						}
// 					} else {
// 						noPhoto.push(layout);
// 					}
// 				}
// 			}
// 		});

// 		sortedLayouts.qrCode = {'label': 'QR Code Ready', 'layouts': qrCode};
// 		sortedLayouts.noPhoto = {'label': 'No Photo', 'layouts': noPhoto};
// 		sortedLayouts.onePhoto = {'label': 'One Photo', 'layouts': onePhoto};
// 		sortedLayouts.twoPhoto = {'label': 'Two Photos', 'layouts': twoPhoto};
// 		sortedLayouts.threePhoto = {'label': 'Three Photos', 'layouts': threePhoto};
// 		sortedLayouts.fourPlusPhoto = {'label': 'Multiple Photos', 'layouts': fourPhoto};
// 	}
// 	return sortedLayouts;
// };

// DesignStudioItem.prototype.getFrontsideLayoutsList = function() {
// 	const itemOrientation = this.getOrientation(), dsi = this, layoutList = [];
// 	if(!_.isNull(this.availableAttributes.other) && !_.isUndefined(this.availableAttributes.other) && this.availableAttributes.other.length > 0){
// 		for(let i = 0, x = this.availableAttributes.other.length; i < x; i = i + 1){
// 			const attribute = this.availableAttributes.other[i];
// 			if((designStudio.currentDSItem.typeCode == 'INVF' || designStudio.currentDSItem.typeCode == 'INVG' || designStudio.currentDSItem.typeCode == 'RPA' || _.isNull(itemOrientation) || (!_.isNull(itemOrientation) && attribute.description.indexOf(itemOrientation) > -1)) && !_.isNull(attribute.groupWebDescription) && !_.isUndefined(attribute.groupWebDescription) && attribute.groupWebDescription.toLowerCase() == 'frontside layout'){
// 				layoutList.push(attribute.template);
// 			}
// 		}
// 	}
// 	return layoutList;
// };

// DesignStudioItem.prototype.getBacksideLayouts = function() {
// 	const itemOrientation = this.getOrientation(), dsi = this, layouts = [], sortedLayouts = {};
// 	if(!_.isNull(this.availableAttributes.other) && !_.isUndefined(this.availableAttributes.other) && this.availableAttributes.other.length > 0){
// 		for(let i = 0, x = this.availableAttributes.other.length; i < x; i = i + 1){
// 			const attribute = this.availableAttributes.other[i];
// 			if(!_.isNull(attribute.groupWebDescription) && !_.isUndefined(attribute.groupWebDescription) && attribute.groupWebDescription.toLowerCase() == 'backside layout'){
// 				layouts.push(attribute);
// 			}
// 		}
// 	}

// 	if(layouts.length > 0){
// 		const qrCode = [], noPhoto = [], onePhoto = [], twoPhoto = [], threePhoto = [], fourPhoto = [];
// 		$j.each(layouts, function(index, layout){
// 			if((designStudio.currentDSItem.typeCode == 'INVF' || designStudio.currentDSItem.typeCode == 'INVG' || designStudio.currentDSItem.typeCode == 'RPA' || _.isNull(itemOrientation) || (!_.isNull(itemOrientation) && layout.description.indexOf(itemOrientation) > -1))){
// 				if(layout.description.indexOf('qrTemplate') > -1){
// 					qrCode.push(layout);
// 				} else {
// 					let numPhotos = 0;
// 					numPhotos = parseInt(layout.description.split('_graphics')[1].substring(0,1));
// 					switch(numPhotos){
// 						case 0:
// 							noPhoto.push(layout);
// 							break;
// 						case 1:
// 							onePhoto.push(layout);
// 							break;
// 						case 2:
// 							twoPhoto.push(layout);
// 							break;
// 						case 3:
// 							threePhoto.push(layout);
// 							break;
// 						default:
// 							fourPhoto.push(layout);
// 							break;
// 					}
// 				}
// 			}
// 		});

// 		sortedLayouts.qrCode = {'label': 'QR Code Ready', 'layouts': qrCode};
// 		sortedLayouts.noPhoto = {'label': 'No Photo', 'layouts': noPhoto};
// 		sortedLayouts.onePhoto = {'label': 'One Photo', 'layouts': onePhoto};
// 		sortedLayouts.twoPhoto = {'label': 'Two Photos', 'layouts': twoPhoto};
// 		sortedLayouts.threePhoto = {'label': 'Three Photos', 'layouts': threePhoto};
// 		sortedLayouts.fourPlusPhoto = {'label': 'Multiple Photos', 'layouts': fourPhoto};
// 	}
// 	return sortedLayouts;
// };

// DesignStudioItem.prototype.getBacksideLayoutsList = function() {
// 	const itemOrientation = this.getOrientation(), dsi = this, layoutList = [];
// 	if(!_.isNull(this.availableAttributes.other) && !_.isUndefined(this.availableAttributes.other) && this.availableAttributes.other.length > 0){
// 		for(let i = 0, x = this.availableAttributes.other.length; i < x; i = i + 1){
// 			const attribute = this.availableAttributes.other[i];
// 			if((designStudio.currentDSItem.typeCode == 'INVF' || designStudio.currentDSItem.typeCode == 'INVG' || designStudio.currentDSItem.typeCode == 'RPA' || _.isNull(itemOrientation) || (!_.isNull(itemOrientation) && attribute.description.indexOf(itemOrientation) > -1)) && !_.isNull(attribute.groupWebDescription) && !_.isUndefined(attribute.groupWebDescription) && attribute.groupWebDescription.toLowerCase() == 'backside layout'){
// 				layoutList.push(attribute.template);
// 			}
// 		}
// 	}
// 	return layoutList;
// };

// DesignStudioItem.prototype.getFrontViewIndex = function () {
// 	let dsItemViewIndex = -1, tempDSItemView;
// 	for (let i = 0, x = this.views.length; i < x; i = i + 1) {
// 		tempDSItemView = this.views[i];
// 		if (tempDSItemView.sceneName.indexOf('_front') > -1) {
// 			dsItemViewIndex = i;
// 			break;
// 		}
// 	}

// 	return dsItemViewIndex;
// };

// DesignStudioItem.prototype.getBackViewIndex = function () {
// 	let dsItemViewIndex = -1, tempDSItemView;
// 	for (let i = 0, x = this.views.length; i < x; i = i + 1) {
// 		tempDSItemView = this.views[i];
// 		if (tempDSItemView.sceneName.indexOf('_back') > -1) {
// 			dsItemViewIndex = i;
// 			break;
// 		}
// 	}

// 	return dsItemViewIndex;
// };

// /*
// DesignStudioItem.prototype.getBacksideDesigns = function() {
// 	var itemOrientation = this.getOrientation(), dsi = this, designs = [];
// 	Object.keys(designStudio.backsideDesigns).forEach(function(key) {
// 		if(dsi.typeCode.includes(key)){
// 			var orientations = designStudio.backsideDesigns[key];
// 			Object.keys(orientations).forEach(function(orientation) {
// 				if(_.isNull(itemOrientation) || orientation == itemOrientation){
// 					designs = designStudio.backsideDesigns[key][orientation];
// 				}
// 			});
// 		}
// 	});

// 	return designs;
// };
// */

// DesignStudioItem.prototype.getBacksideDesigns = function() {
// 	const backsideDesigns = [];
// 	if(!_.isNull(this.availableAttributes.other) && !_.isUndefined(this.availableAttributes.other) && this.availableAttributes.other.length > 0){
// 		for(let i = 0, x = this.availableAttributes.other.length; i < x; i = i + 1){
// 			const attribute = this.availableAttributes.other[i];
// 			if(!_.isNull(attribute.groupWebDescription) && !_.isUndefined(attribute.groupWebDescription) && attribute.groupWebDescription.toLowerCase() == 'backside design'){
// 				backsideDesigns.push(attribute);
// 			}
// 		}
// 	}
// 	return backsideDesigns;
// };

// DesignStudioItem.prototype.getBacksideDesignsList = function() {
// 	const designList = [];
// 	const backsideDesigns = [];
// 	if(!_.isNull(this.availableAttributes.other) && !_.isUndefined(this.availableAttributes.other) && this.availableAttributes.other.length > 0){
// 		for(let i = 0, x = this.availableAttributes.other.length; i < x; i = i + 1){
// 			const attribute = this.availableAttributes.other[i];
// 			if(!_.isNull(attribute.groupWebDescription) && !_.isUndefined(attribute.groupWebDescription) && attribute.groupWebDescription.toLowerCase() == 'backside design'){
// 				backsideDesigns.push(attribute);
// 			}
// 		}
// 	}

// 	if(backsideDesigns.length > 0){
// 		$j.each(backsideDesigns, function(index, design){
// 			designList.push(design.template);
// 		});
// 	}
// 	return designList;
// };

// DesignStudioItem.prototype.hasSubstrateAttributes = function() {
// 	return this.availableAttributes &&
// 			this.availableAttributes.substrates &&
// 			this.availableAttributes.substrates.length > 1; //One is always selected, so only having one doesn't count
// }

// DesignStudioItem.prototype.hasOtherAttributes = function() {
// 	return this.availableAttributes &&
// 			this.availableAttributes.other &&
// 			this.availableAttributes.other.length > 0;
// }

// DesignStudioItem.prototype.hasFoilAttributes = function() {
// 	return this.availableAttributes &&
// 			this.availableAttributes.foil &&
// 			this.availableAttributes.foil.length > 0;
// }

// DesignStudioItem.prototype.getNotAllowedWithTypeIds_IntList = function() {
// 	const typeIdList = [];
// 	if(this.productNotAllowedWithTypeIds){
// 		const notAllowedWithIds = this.productNotAllowedWithTypeIds.split(',');
// 		for(let i = 0; i < notAllowedWithIds.length; i++){
// 			typeIdList.push(parseInt(notAllowedWithIds[i]));
// 		}
// 	}
// 	return typeIdList;
// }

// DesignStudioItem.prototype.hasBacksideElement = function(){
// 	let hasBacksideElement = false;
// 	if(!_.isNull(this.textBoxes) && !_.isUndefined(this.textBoxes) && this.textBoxes.length > 0){
// 		for(var i = 0; i < this.textBoxes.length; i++){
// 			if(this.textBoxes[i].tagName.indexOf('bs-') > -1){
// 				hasBacksideElement = true;
// 				break;
// 			}
// 		}
// 	}

// 	if(!hasBacksideElement && !_.isNull(this.imageBoxes) && !_.isUndefined(this.imageBoxes) && this.imageBoxes.length > 0){
// 		for(var i = 0; i < this.imageBoxes.length; i++){
// 			if(this.imageBoxes[i].tagName.indexOf('bs-') > -1){
// 				hasBacksideElement = true;
// 				break;
// 			}
// 		}
// 	}
// 	return hasBacksideElement;
// };

// DesignStudioItem.prototype.mostRecentLinesOfTextAppliedToEnvgImage = [];
// DesignStudioItem.prototype.mostRecentNameFontSize = null;
// DesignStudioItem.prototype.mostRecentAddressFontSize = null;
// //designStudio.getItemByProductType('ENVG').updateEnvgRecipientAddressWithExampleEntry();
// DesignStudioItem.prototype.updateEnvgRecipientAddressWithExampleEntry = function(forceUpdate){
// 	const textBoxEdited = this.updateEnvgRecipientAddressWithExampleEntry_textBox(forceUpdate);
// 	if(textBoxEdited) textBoxEdited.textEditCallback();
// }

// DesignStudioItem.prototype.updateEnvgRecipientAddressWithExampleEntry_textBox = function(forceUpdate){

// //	console.log('--------------------------------------------------------------------');
// //	console.log('--------------------- TRY TO UPDATE ENVG IMAGE ---------------------');
// //	console.log('--------------------------------------------------------------------');

// 	let textBoxEdited = null;
// 		envgItem = designStudio.getItemByProductType('ENVG'),
// 		envgProps = envgItem.IDSObject.envgProps;

// 	if(forceUpdate){
// 		this.mostRecentLinesOfTextAppliedToEnvgImage = [];
// 		this.mostRecentNameFontSize = null;
// 		this.mostRecentAddressFontSize = null;
// 	}

// 	if(!envgItem ||
// 			isNullOrEmpty(envgItem.textBoxes) ||
// 			!designStudio.dsItemMailingList){
// 		//Missing something we need, bail out
// 		return null;
// 	}

// 	let _recipientLine1 = '',
// 		_recipientLine2 = '',
// 		_addressLine1 = '',
// 		_addressLine2 = '',
// 		_cityStateZip = '',
// 		_country = '',
// 		nameFontSize = null,
// 		addressFontSize = null;

// 	if(isNullOrEmpty(designStudio.dsItemMailingList.selectedMailingLists)){
// 		//No list selected, put stock text in place
// 		_recipientLine1 = 'John & Mary Sample';
// 		_addressLine1 = '123 Main Street';
// 		_cityStateZip = 'Anytown, US 55555';

// 	} else if(isNullOrEmpty(designStudio.dsItemMailingList.selectedMailingLists[0].recordList)){
// 		//List is selected but currently empty (start from scratch option selected, most likely).
// 		//Do not bother to update the image (but it would work if we let this function continue), since the customer cannot advance with no addresses
// 		return null;

// 	} else {
// 		const currentRecordList = designStudio.dsItemMailingList.selectedMailingLists[0].recordList,
// 			targetEntryId = dsEnvg.getEnvgEntryForPreviewId(currentRecordList),
// 			targetEntry = currentRecordList[targetEntryId-1];

// 		_recipientLine1 = targetEntry.RECIPIENT_LINE_1;
// 		_recipientLine2 = targetEntry.RECIPIENT_LINE_2;
// 		_addressLine1 = targetEntry.ADDRESS_LINE_1;
// 		_addressLine2 = targetEntry.ADDRESS_LINE_2;
// 		_cityStateZip = targetEntry.CITY_STATE_ZIP;
// 		_country = targetEntry.COUNTRY;

// 		if(!dsEnvg || !dsEnvg.recipientAddressStyles || !dsEnvg.recipientAddressStyles.recipientAddressStyle || !dsEnvg.recipientAddressStyles.recipientAddressStyle.fontSizePt){
// 			return null;
// 		}

// 		const originalAddressPtSize = dsEnvg.recipientAddressStyles.recipientAddressStyle.fontSizePt,
// 			originalAddressEmSize = dsEnvg.recipientAddressStyles.recipientAddressStyle.fontSizeEm,
// 			_basis_em_to_pt = originalAddressPtSize/originalAddressEmSize;

// 		//Make sure we have autoscale values for this entry, in case we need them
// 		dsEnvg.autoScaleLines(targetEntryId);
// 		if(notNullOrEmpty(dsEnvg.nonDefaultFontSizesForRecords['name_'+targetEntryId])){
// 			nameFontSize = (dsEnvg.nonDefaultFontSizesForRecords['name_'+targetEntryId] * _basis_em_to_pt);
// 		}
// 		if(notNullOrEmpty(dsEnvg.nonDefaultFontSizesForRecords['address_'+targetEntryId])) {
// 			addressFontSize = (dsEnvg.nonDefaultFontSizesForRecords['address_'+targetEntryId] * _basis_em_to_pt);
// 		}
// 	}

// 	let newTextToSubmit = false,
// 		proposedNewLinesOfText = [];

// 	if(notNullOrEmpty(_recipientLine1)) proposedNewLinesOfText.push(_recipientLine1);
// 	if(notNullOrEmpty(_recipientLine2)) proposedNewLinesOfText.push(_recipientLine2);
// 	if(notNullOrEmpty(_addressLine1)) proposedNewLinesOfText.push(_addressLine1);
// 	if(notNullOrEmpty(_addressLine2)) proposedNewLinesOfText.push(_addressLine2);
// 	if(notNullOrEmpty(_cityStateZip)) proposedNewLinesOfText.push(_cityStateZip);
// 	if(notNullOrEmpty(_country)) proposedNewLinesOfText.push(_country);

// 	if((nameFontSize && nameFontSize != this.mostRecentNameFontSize) ||
// 			(addressFontSize && addressFontSize != this.mostRecentAddressFontSize)){
// 		//Font size change
// 		newTextToSubmit = true;

// 	} else if(this.mostRecentLinesOfTextAppliedToEnvgImage.length != proposedNewLinesOfText.length){
// 		//First time updating, or we have more/less lines of text that need to be sent through
// 		newTextToSubmit = true;

// 	} else {
// 		//Do line comparisons to see if anything is different, we should have two lists the same size that are not empty at this point
// 		for(var i = 0; i < proposedNewLinesOfText.length && !newTextToSubmit; i++){
// 			if(proposedNewLinesOfText[i] != this.mostRecentLinesOfTextAppliedToEnvgImage[i]){
// 				newTextToSubmit = true;
// 			}
// 		}
// 	}

// 	if(!newTextToSubmit){
// //		console.log('DO NOT SEND NEW TEXT TO IMAGE');
// 		return null;
// 	} else {
// //		console.log('SEND NEW TEXT LINES TO IMAGE (allow execution of function to continue)');
// 		this.mostRecentLinesOfTextAppliedToEnvgImage = proposedNewLinesOfText;
// 		this.mostRecentNameFontSize = nameFontSize;
// 		this.mostRecentAddressFontSize = addressFontSize;
// 	}

// 	for(var i = 0; i < envgItem.textBoxes.length; i++){
// 		const envgTextBox = envgItem.textBoxes[i];

// 		if(envgTextBox.lockEditing && envgTextBox.tagName === 'guest_name'){
// 			textBoxEdited = envgTextBox;
// 			//use fallback font size (original designed size from template ENVG properties scraped by extract script) if we don't have one
// 			if(isNullOrEmpty(nameFontSize)){
// 				var nameCssStyle = envgProps['guest_name'].textStyleRanges[0];
// 				nameFontSize = envgProps.cssStyles[nameCssStyle].fontSize;
// 			}
// 			//_recipientLine1, _recipientLine2
// 			if(notNullOrEmpty(envgTextBox.contentFormatted) && notNullOrEmpty(envgTextBox.contentFormatted[0].textStyleRanges)){
// 				var firstCF = envgTextBox.contentFormatted[0],
// 					firstTSR = firstCF.textStyleRanges[0],
// 					linesOfText = [],
// 					newContentFormatted= [];
// 				if(notNullOrEmpty(_recipientLine1)) linesOfText.push(_recipientLine1.trim());
// 				if(notNullOrEmpty(_recipientLine2)) linesOfText.push(_recipientLine2.trim());
// 				if(isNullOrEmpty(linesOfText)) linesOfText.push(' ');

// 				for(var l = 0; l < linesOfText.length; l++){
// 					var lineOfText = linesOfText[l],
// 						encodedContent = [];
// 					for (var j=0; j < lineOfText.length; j++){
// 						encodedContent.push(lineOfText.charCodeAt(j));
// 					}
// 					var newTsr = _.clone(firstTSR);
// 					newTsr.contents = encodedContent.join(",")+","+(l < linesOfText.length-1 ? "13," : "");
// 					if(nameFontSize) newTsr.pointSize = nameFontSize;
// 					newContentFormatted.push(new DesignStudioItemFormattedContent(firstCF.justification, [newTsr]));
// 				}
// 				envgTextBox.contentFormatted = newContentFormatted;
// 			}

// 		} else if(envgTextBox.lockEditing && envgTextBox.tagName === 'guest_address'){
// 			textBoxEdited = envgTextBox;
// 			//use fallback font size (original designed size from template ENVG properties scraped by extract script) if we don't have one
// 			if(isNullOrEmpty(nameFontSize)){
// 				var addressCssStyle = envgProps['guest_address'].textStyleRanges[0];
// 				addressFontSize = envgProps.cssStyles[addressCssStyle].fontSize;
// 			}
// 			//_addressLine1, _addressLine2, _cityStateZip, _country
// 			if(notNullOrEmpty(envgTextBox.contentFormatted) && notNullOrEmpty(envgTextBox.contentFormatted[0].textStyleRanges)){
// 				var firstCF = envgTextBox.contentFormatted[0],
// 					firstTSR = firstCF.textStyleRanges[0],
// 					linesOfText = [],
// 					newContentFormatted= [];

// 				if(notNullOrEmpty(_addressLine1)) linesOfText.push(_addressLine1.trim());
// 				if(notNullOrEmpty(_addressLine2)) linesOfText.push(_addressLine2.trim());
// 				if(notNullOrEmpty(_cityStateZip)) linesOfText.push(_cityStateZip.trim());
// 				if(notNullOrEmpty(_country)) linesOfText.push(_country.trim());
// 				if(isNullOrEmpty(linesOfText)) linesOfText.push(' ');

// 				for(var l = 0; l < linesOfText.length; l++){
// 					var lineOfText = linesOfText[l],
// 						encodedContent = [];
// 					for (var j=0; j < lineOfText.length; j++){
// 						encodedContent.push(lineOfText.charCodeAt(j));
// 					}
// 					var newTsr = _.clone(firstTSR);
// 					newTsr.contents = encodedContent.join(",")+","+(l < linesOfText.length-1 ? "13," : "");
// 					if(addressFontSize) newTsr.pointSize = addressFontSize;
// 					newContentFormatted.push(new DesignStudioItemFormattedContent(firstCF.justification, [newTsr]));
// 				}
// 				envgTextBox.contentFormatted = newContentFormatted;
// 			}

// 		} else if (envgTextBox.lockEditing && envgTextBox.tagName === 'guest_info'){
// 			textBoxEdited = envgTextBox;
// 			//use fallback font size (original designed size from template ENVG properties scraped by extract script) if we don't have one
// 			if(isNullOrEmpty(nameFontSize)){
// 				var tsrList = envgProps['guest_info'].textStyleRanges,
// 					nameCssStyle = tsrList[0],
// 					addressCssStyle = tsrList.length > 1 ? tsrList[1] : nameCssStyle;
// 				nameFontSize = envgProps.cssStyles[nameCssStyle].fontSize;
// 				addressFontSize = envgProps.cssStyles[addressCssStyle].fontSize;
// 			}
// 			//_recipientLine1, _recipientLine2, _addressLine1, _addressLine2, _cityStateZip, _country

// 			if(notNullOrEmpty(envgTextBox.contentFormatted) && notNullOrEmpty(envgTextBox.contentFormatted[0].textStyleRanges)){
// 				var nameCF = envgTextBox.contentFormatted[0],
// 					nameTSR = nameCF.textStyleRanges[0],
// 					addressCF = null,
// 					addressTSR = null,
// 					nameLinesOfText = [],
// 					addressLinesOfText = [],
// 					newContentFormatted = [];

// 				//find second style for address, if it exists
// 				for(var j = 1; j < envgTextBox.contentFormatted.length && !addressCF && !addressTSR; j++){
// 					const inspectCF = envgTextBox.contentFormatted[j],
// 						inspectTSR = inspectCF.textStyleRanges[0];

// 					if(inspectTSR.font != nameTSR.font || inspectTSR.pointSize != nameTSR.pointSize){
// 						//found a different font size or family, assume this is the address style
// 						addressCF = inspectCF;
// 						addressTSR = inspectTSR;
// 					}
// 				}
// 				if(!addressCF && !addressTSR){
// 					//The text is uniform style for name and address
// 					addressCF = nameCF;
// 					addressTSR = nameTSR;
// 				}

// 				//Guest name lines
// 				if(notNullOrEmpty(_recipientLine1)) nameLinesOfText.push(_recipientLine1.trim());
// 				if(notNullOrEmpty(_recipientLine2)) nameLinesOfText.push(_recipientLine2.trim());
// 				if(isNullOrEmpty(nameLinesOfText)) nameLinesOfText.push(' ');

// 				for(var l = 0; l < nameLinesOfText.length; l++){
// 					var lineOfText = nameLinesOfText[l],
// 						encodedContent = [];
// 					for (var j=0; j < lineOfText.length; j++){
// 						encodedContent.push(lineOfText.charCodeAt(j));
// 					}
// 					var newTsr = _.clone(nameTSR);
// 					newTsr.contents = encodedContent.join(",")+","+(l <= nameLinesOfText.length-1 ? "13," : "");
// 					if(nameFontSize) newTsr.pointSize = nameFontSize;
// 					newContentFormatted.push(new DesignStudioItemFormattedContent(nameCF.justification, [newTsr]));
// 				}

// 				//Guest Address lines
// 				if(notNullOrEmpty(_addressLine1)) addressLinesOfText.push(_addressLine1.trim());
// 				if(notNullOrEmpty(_addressLine2)) addressLinesOfText.push(_addressLine2.trim());
// 				if(notNullOrEmpty(_cityStateZip)) addressLinesOfText.push(_cityStateZip.trim());
// 				if(notNullOrEmpty(_country)) addressLinesOfText.push(_country.trim());
// 				if(isNullOrEmpty(addressLinesOfText)) addressLinesOfText.push(' ');

// 				for(var l = 0; l < addressLinesOfText.length; l++){
// 					var lineOfText = addressLinesOfText[l],
// 						encodedContent = [];
// 					for (var j=0; j < lineOfText.length; j++){
// 						encodedContent.push(lineOfText.charCodeAt(j));
// 					}
// 					var newTsr = _.clone(addressTSR);
// 					newTsr.contents = encodedContent.join(",")+","+(l < addressLinesOfText.length-1 ? "13," : "");
// 					if(addressFontSize) newTsr.pointSize = addressFontSize;
// 					newContentFormatted.push(new DesignStudioItemFormattedContent(addressCF.justification, [newTsr]));
// 				}

// 				envgTextBox.contentFormatted = newContentFormatted;
// 			}
// 		}
// 	}
// 	return textBoxEdited;

// };

// DesignStudioItem.prototype.generateAnimatedUpsellImage = function() {
// 	let generateFilesURL, generateViewURL,
// 		dsi = this;

// 	const productViewString = this.getAnimatedViewsString();

// 	if(!this.generatingAnimatedImage && productViewString.length > 0){
// 		this.generatingAnimatedImage = true;
// 		this.waitingCount = 0;
// 		this.generateWaitingCount = 0;
// 		generateFilesURL = designStudio.baseIDSLocation + 'generateAnimatedFiles?sessionId=' + this.sessionId + '&documentId=' + this.documentId + '&viewList=' + productViewString + '&foilColor=gold&r=' + Math.random() + ':' + new Date().getTime();
// 		generateViewURL = designStudio.baseIDSLocation + 'generateAnimatedView?sessionId=' + this.sessionId + '&documentId=' + this.documentId + '&viewList=' + productViewString + '&foilColor=gold&r=' + Math.random() + ':' + new Date().getTime();

// 		const variation = this.getSelectedVariationAttribute();
// 		if(!_.isNull(variation) && !_.isUndefined(variation)){
// 			generateFilesURL += '&variation=' + variation.template;
// 			generateViewURL += '&variation=' + variation.template;
// 		}
// 		$j.post(generateFilesURL,
// 			'docData=' + encodeURIComponent(JSON.stringify(dsi.IDSObject)),
// 			function(response){
// 				//designStudio.currentDSItem.generatingAnimatedImage = false;
// 			},
// 			'json'
// 		)
// 		.then(function(){
// 			$j.post(generateViewURL,
// 				'docData=' + encodeURIComponent(JSON.stringify(dsi.IDSObject)),
// 				function(response){
// 					designStudio.currentDSItem.generatingAnimatedImage = false;
// 				},
// 				'json'
// 			);
// 		});

// 	} else if(this.generatingAnimatedImage && this.generateWaitingCount < 10){
// 		this.generateWaitingCount++;
// 		setTimeout(function(){designStudio.currentDSItem.generateAnimatedUpsellImage();}, 500);
// 	} else {
// 		this.generateWaitingCount = 0;
// 		this.waitingCount = 0;
// 		this.generateAnimatedImage = false;
// 	}
// };

// DesignStudioItem.prototype.getAnimatedUpsell = function() {
// 	if(designStudio.dsJSON.marketId === 517 || designStudio.dsJSON.marketId === 524){
// 		designStudio.lockInterfaceAndShowProgressSpinner();
// 		if(!this.generatingAnimatedImage){
// 			let dsi = this, animatedImage, upsellContainer, upsellHeader, upsellFoilImage, upsellText, upsellButton, upsellDeclineLink;

// 			const productViewString = this.getAnimatedViewsString();

// 			//Example call: http://v1137-dids.magnetstreet.net/dsservices/apiV1/getDocumentView?sessionId=20141031-94DF4DDC640D0F991B7EA07CAB0718C8&documentId=304DF038428A6AC9738E668D1CEE2985&viewName=invr_design-studio_front&viewSize=th
// 			const animatedImageURL = designStudio.baseIDSLocation + 'getAnimatedView?sessionId=' + this.sessionId + '&documentId=' + this.documentId + '&viewList=' + productViewString + '&foilColor=gold&r=' + Math.random() + ':' + new Date().getTime();

// 			animatedImage = document.createElement('img');
// 			animatedImage.className = 'animatedUpsellImage';
// 			animatedImage.src = animatedImageURL;

// 			upsellContainer = document.createElement('div');
// 			upsellContainer.className = 'upsellContainer';
// 			upsellContainer.id = 'upsellContainer';

// 			upsellDetails = document.createElement('div');
// 			upsellDetails.className = 'foilUpsellDetails';

// 			upsellHeader = document.createElement('h2');
// 			upsellHeader.className = 'upsellHeader';
// 			upsellHeader.id = 'upsellHeader';
// 			upsellHeader.innerHTML = 'Dazzle with Custom Foil!';

// 			upsellFoilImage = document.createElement('img');
// 			upsellFoilImage.className = 'upsellFoilImage';
// 			upsellFoilImage.src = '/stores/html/weddings/images/secondary-save-the-date-foil-title_1x.jpg';

// 			upsellText = document.createElement('p');
// 			upsellText.className = 'upsellText';
// 			upsellText.id = 'upsellText';
// 			upsellText.innerHTML = 'With three lustrous foil colors to pick from, we give you the freedom to add shiny dimension to the design elements and text of your choosing. From a small hint of luster to a lot, create the perfect combo of foil, typography, and colors for a Foil ' + this.productType + ' that will let your personalities truly shine!';

// 			upsellActions = document.createElement('div');
// 			upsellActions.className = 'foilUpsellModalActions';

// 			upsellButton = document.createElement('div');
// 			upsellButton.className = 'button upsellButton';
// 			upsellButton.id = 'upsellButton';
// 			upsellButton.innerHTML = '<div>Yes, add foil for $' + this.getFoilCost() + '</div>';

// 			upsellDeclineLink = document.createElement('div');
// 			upsellDeclineLink.className = 'upsellDeclineLink';
// 			upsellDeclineLink.id = 'upsellDeclineLink';
// 			upsellDeclineLink.innerHTML = 'No thanks';

// 			upsellActions.appendChild(upsellDeclineLink);
// 			upsellActions.appendChild(upsellButton);

// 			upsellDetails.appendChild(upsellHeader);
// 			upsellDetails.appendChild(upsellFoilImage);
// 			upsellDetails.appendChild(upsellText);
// 			upsellDetails.appendChild(upsellActions);

// 			upsellContainer.appendChild(animatedImage);
// 			upsellContainer.appendChild(upsellDetails);

// 			const viewImage = new Image();
// 			viewImage.src = animatedImageURL;

// 			viewImage.onload = function(event){
// 				HotTub.popup.renderPopup(upsellContainer.outerHTML, true, '', true, designStudio.navigation.defaultNextClickEvent, dsi.addUpsellPopupEvents);
// 				designStudio.unlockInterfaceAndRemoveProgressSpinner();
// 				MSGA.designStudio3.showAnimatedPopup();
// 			}
// 			viewImage.onerror = function(){
// 				designStudio.navigation.defaultNextClickEvent();
// 			}
// 		} else if(this.generateAnimatedImage && this.waitingCount < 10){
// 			this.waitingCount++;
// 			setTimeout(function(){
// 				designStudio.currentDSItem.getAnimatedUpsell();
// 			}, 500);
// 		} else {
// 			designStudio.navigation.defaultNextClickEvent();
// 		}
// 	} else {
// 		designStudio.navigation.defaultNextClickEvent();
// 	}
// };

// DesignStudioItem.prototype.getAnimatedViewsString = function() {
// 	let animatedViewStr = '';
// 	if(!_.isNull(this.productAnimatedViewSet) && !_.isUndefined(this.productAnimatedViewSet) && this.productAnimatedViewSet.length > 0){
// 		for(let i = 0, x = this.productAnimatedViewSet.length; i < x; i = i + 1){
// 			if(i > 0) {animatedViewStr += ','; }
// 			animatedViewStr += this.productAnimatedViewSet[i].scene;
// 		}
// 	}
// 	return animatedViewStr;
// };

// DesignStudioItem.prototype.addUpsellPopupEvents = function() {
// 	$j('#upsellButton').on('click', function(index, obj){
// 		let colorChanged = false;

// 		for(let i = 0, x = designStudio.currentDSItem.colorSwatches.length; i < x; i = i + 1){
// 			if(designStudio.currentDSItem.colorSwatches[i].foilable){
// 				designStudio.currentDSItem.colorSwatches[i].updateColor(msColors.colors[1].swatches[0]);
// 				colorChanged = true;
// 			}
// 		}
// 		if(colorChanged){
// 			//$j('.dsArtboard .mainImage').addClass('loading');
// 			//designStudio.addLoadingAnimation('.dsArtboard .mainImage');
// 			designStudio.currentDSItem.handleColorChange(designStudio.updateItemAndReRenderEditableAttributes);
// 			designStudio.currentDSItem.updateSelectedAttributes();
// 			designStudio.navigation.defaultPrevClickEvent();
// 			const tabs = $j('#designControlTabs');
// 			tabs.removeClass('text colorSwatches userPhotos designs backside').addClass('colorSwatches');
// 			designStudio.currentViewIndex = 0;
// 			designStudio.handleViewChange();
// 			const substrate = designStudio.currentDSItem.getFirstValidSubstrateForOverprint(designStudio.currentDSItem.getSelectedFoilAttribute().id);
// 			if(!_.isNull(substrate)){
// 				designStudio.currentDSItem.updateSubstrate(substrate.id);
// 			}
// 			HotTub.popup.closePopup();
// 			MSGA.designStudio3.addFoilFromAnimatedPopup();
// 			//designStudio.navigation.defaultNextClickEvent();
// 		}
// 	});

// 	$j('#upsellDeclineLink').on('click', function(){
// 		HotTub.popup.closePopup();
// 	});
// };

// DesignStudioItem.prototype.getFirstValidSubstrateForOverprint = function(matchAttributeId){
// 	if(!_.isNull(this.availableAttributes) && !_.isUndefined(this.availableAttributes)
// 			&& !_.isNull(this.availableAttributes.substrates) && !_.isUndefined(this.availableAttributes.substrates) && this.availableAttributes.substrates.length > 0){

// 		const substrates = this.availableAttributes.substrates;
// 		for(let i = 0; i < substrates.length; i = i + 1){
// 			if(!_.isNull(substrates[i].notAllowedWith) && !_.isUndefined(substrates[i].notAllowedWith) && (substrates[i].notAllowedWith.length > 0 && substrates[i].notAllowedWith.indexOf(matchAttributeId) < 0) || (substrates[i].notAllowedWith.length == 0)){
// 				return substrates[i];
// 			}
// 		}
// 		return null;
// 	}
// };

// DesignStudioItem.prototype.getSuspectElementCount = function() {
// 	if(this.textBoxes.length > 0 || this.imageBoxes.length > 0){
// 		let suspectElementsCount = 0;
// 		for(var i = 0, x = this.textBoxes.length; i < x; i++){
// 			const textBox = this.textBoxes[i];
// 			if(!textBox.modified && !textBox.isLegacyDateDrivenTextBox() && !textBox.isMonthTextBoxWithLegendCodes() && designStudio.safePhrases.indexOf(textBox.originalPlainText.toLowerCase()) < 0){
// 				suspectElementsCount++;
// 			}
// 		}
// 		for(var i = 0, x = this.imageBoxes.length; i < x; i++){
// 			const imageBox = this.imageBoxes[i];
// 			if(!imageBox.modified){
// 				suspectElementsCount++;
// 			}
// 		}

// 		return suspectElementsCount;
// 	}
// };

// DesignStudioItem.prototype.hasTitledGroupsTable = function() {
// 	for(let i = 0; this.textBoxes.length > 0 && i < this.textBoxes.length; i++)
// 		if(this.textBoxes[i].contentType == 'titledGroupsTable')
// 			return true;

// 	return false;
// };

// DesignStudioItem.prototype.getTemplateVariation = function(variationName) {
// 	return this.templateVariations.find(function(variation){return variation.name == variationName;});
// };
