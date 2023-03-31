require([
  "esri/WebMap",
  "esri/views/MapView",
  "esri/widgets/Legend",
  "esri/widgets/Swipe",
  "esri/widgets/LayerList",
  "esri/widgets/BasemapGallery",
  "esri/widgets/Bookmarks",
  "esri/widgets/Expand",
  "esri/widgets/DistanceMeasurement2D",
  "esri/widgets/AreaMeasurement2D"
], function (WebMap, MapView, Legend, Swipe, LayerList, BasemapGallery, Bookmarks, Expand, DistanceMeasurement2D, AreaMeasurement2D) {

  const map = new WebMap({
    portalItem: {
      // autocast
      id: "785c744c5db240f2b99a3ada98620c23"
    }
  });
  const view = new MapView({
    container: "viewDiv",
    map: map
  });
  
  const basemapGallery = new BasemapGallery({
	view : view
  });	
  const bmapExpand = new Expand({
	  view: view,
	  content: basemapGallery,
	  expanded: false
  });
  
  const bookmarks = new Bookmarks({
	  view: view,
	  editingEnabled: true
  });  
  const bkExpand = new Expand({
	  view: view,
	  content: bookmarks,
	  expanded: false
  });
	  
  const distmeasure = new DistanceMeasurement2D({
	view: view
  });
  const distExpand = new Expand({
	  view: view,
	  content: distmeasure,
	  expanded: false
  });
  
  const areameasure = new AreaMeasurement2D({
	view: view
  });
  const areaExpand = new Expand({
	  view: view,
	  content: areameasure,
	  expanded: false
  });
	  
	view.ui.add(bmapExpand, "top-left");
	view.ui.add(bkExpand, "top-left");
	view.ui.add(distExpand, "top-left");
    view.ui.add(areaExpand, "top-left");
  
	  
  /******************************************************************
   *
   * Widget example - Add legend widget
					  Add LayerList, BasemapGallery
					  Add Bookmark and Expand to Bookmark/ Legend
   *
   ******************************************************************/
  view.when(function () {
	  
	  // fetch the crime layer from web map & assign it to chicagoCrime object
    const chicagoCrime = map.layers.getItemAt(0); // bottom
    const vehicles = map.layers.getItemAt(1); // middle of TOC
    const homicides = map.layers.getItemAt(2);
	
	// define LayerList
	const layerList = new LayerList({
		view: view
	});		
	

    homicides.visible = true;
	vehicles.visible = true;
    // Step 1: Create legend widget
    const legend = new Legend({
      // Step 2: Specify any additional properties for the legend. In this case,
      // we are just setting the view to where the legend widget should appear
	  // Legend widget contains 2 layers: Homicide site symbol+ Crime size/color symbol(ie.Crime tract & Narcotics)
      view: view,
      layerInfos: [{
          layer: chicagoCrime,
          title: "Chicago Crime Tracts"
        },
        {
          layer: homicides,
          title: "Chicago Homicide Data"
        },
		{ 
		  layer: vehicles,
		  title: "Chicage Vehicle Theft"
		}
      ]
    });
	// define Expand for Layerlist widget
	const layerExpand = new Expand({
	  view: view,
	  content: layerList,
      expanded: false
  });

    const legdExpand = new Expand({
	  view: view,
	  content: legend,
      expanded: false
  });


    const swipe = new Swipe({
      view: view,
      leadingLayers: [chicagoCrime, vehicles],
      trailingLayers: [homicides],
      position: 45
    });
	// Swipe widget contains 2 layers

    // Step 3: Add the widget to the view's UI, specify the docking position as well
    view.ui.add(legdExpand, "top-right");
	view.ui.add(layerExpand, "top-left");
    view.ui.add(swipe);
	
		

  });
});