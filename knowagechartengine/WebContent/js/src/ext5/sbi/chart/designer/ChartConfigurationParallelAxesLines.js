Ext.define
(
	"Sbi.chart.designer.ChartConfigurationParallelAxesLines", 
	
	{
		extend: 'Sbi.chart.designer.ChartConfigurationRoot',
		id: "chartParallelAxesLines",
		
		/**
		 * NOTE: 
		 * This is a temporal solution (for bugs ATHENA-154 and ATHENA-157):
		 * Instead of using dynamic width for this panel that relies
		 * on the width of the width of the window of the browser, fix this
		 * value so it can be entirely visible to the end user. Also the
		 * height will be defined as the fixed value.
		 * 
		 * @author: danristo (danilo.ristovski@mht.net)
		 */
		columnWidth: 1,
//		height: 170, //why this fixed height?? it cuts off the inner components
		
		title: LN("sbi.chartengine.configuration.parallel.axesLines.title"), 
		bodyPadding: 10,
		items: [],
	    fieldDefaults: 
	    {
	        anchor: '100%'
		},
		
		layout: 
		{
		    type: 'vbox'
		},
		
		constructor: function(config) 
		{
			this.callParent(config);
			this.viewModel = config.viewModel;
					
			this.colorPickerAxisColor = null;
			this.colorPickerBrushColor = null;
			this.axisColNamePadd = null;
			this.brushWidth = null;
			
			var globalScope = this;
			
			/* Color picker drop-down matrix (table) */
//			this.colorPickerAxisColor = Ext.create
//			(
//					'Sbi.chart.designer.ColorPickerContainer',
//					
//					{
//						viewModel: this.viewModel,
//						isColorMandatory: true, 
//						width: Sbi.settings.chart.configurationStep.widthOfFields,
//						padding:Sbi.settings.chart.configurationStep.paddingOfTopFields,
//						customLabel: LN("sbi.chartengine.configuration.parallel.axesLines.axisColor"),
//						fieldBind: '{configModel.axisColor}',
//						initiator: "colorPickerAxisColor"
//					}
//			);
	        this.colorPickerAxisColor = Ext.create('Sbi.chart.designer.components.ColorPicker',{
	        	viewModel: this.viewModel,
	        	fieldBind: '{configModel.axisColor}',
	        	bind: '{configModel.axisColor}',
				fieldLabel : LN('sbi.chartengine.configuration.parallel.axesLines.axisColor'),
				emptyText: LN('sbi.chartengine.configuration.parallel.axesLines.axisColor.emptyText'),
				width: Sbi.settings.chart.configurationStep.widthOfFields,
				adding:Sbi.settings.chart.configurationStep.paddingOfTopFields,
				isColorMandatory: true,
			});
	        
	        this.colorPickerAxisColor.on
	        (
        		"colorRendered", 
        		
        		function(actualColorField)
        		{        
        			if (actualColorField == "colorPickerAxisColor")
    				{
        				var axisColor = globalScope.viewModel.data.configModel.data.axisColor;
        				
        				if (axisColor && axisColor!="" && axisColor!="transparent")
    					{
        					globalScope.colorPickerAxisColor.items.items[0]
        						.labelEl.update( LN("sbi.chartengine.configuration.parallel.axesLines.axisColor")+":");
    					}
        				else
    					{
        					globalScope.colorPickerAxisColor.items.items[0]
    							.labelEl.update( LN("sbi.chartengine.configuration.parallel.axesLines.axisColor")
    												+ Sbi.settings.chart.configurationStep.htmlForMandatoryFields + ":");
    					}
    				}        			
    			}
    		);
	        
	        /* Color picker drop-down matrix (table) */
//	        this.colorPickerBrushColor= Ext.create
//	        (
//	        		'Sbi.chart.designer.ColorPickerContainer',
//	        		
//	        		{
//	        			viewModel: this.viewModel,
//	        			isColorMandatory: true, 
//	        			width: Sbi.settings.chart.configurationStep.widthOfFields,
//	        			padding:Sbi.settings.chart.configurationStep.paddingOfTopFields,
//	        			customLabel: LN("sbi.chartengine.configuration.parallel.axesLines.brushColor"),
//	        			fieldBind: '{configModel.brushColor}',	
//	        			initiator: "colorPickerBrushColor",
//	        			
//	        		}
//	        );
	        this.colorPickerBrushColor = Ext.create('Sbi.chart.designer.components.ColorPicker',{
	        	viewModel: this.viewModel,
	        	fieldBind: '{configModel.brushColor}',
	        	bind: '{configModel.brushColor}',
				fieldLabel : LN('sbi.chartengine.configuration.parallel.axesLines.brushColor'),
				emptyText: LN('sbi.chartengine.configuration.parallel.axesLines.brushColor.emptyText'),
				width: Sbi.settings.chart.configurationStep.widthOfFields,
				adding:Sbi.settings.chart.configurationStep.paddingOfTopFields,
				isColorMandatory: true,
			});
	        
	        this.colorPickerBrushColor.on
	        (
        		"colorRendered", 
        		
        		function(actualColorField)
        		{        
        			if (actualColorField == "colorPickerBrushColor")
    				{
        				var brushColor = globalScope.viewModel.data.configModel.data.brushColor;
        				
        				if (brushColor && brushColor!="" && brushColor!="transparent")
    					{
        					globalScope.colorPickerBrushColor.items.items[0]
        						.labelEl.update( LN("sbi.chartengine.configuration.parallel.axesLines.brushColor")+":");
    					}
        				else
    					{
        					globalScope.colorPickerBrushColor.items.items[0]
    							.labelEl.update( LN("sbi.chartengine.configuration.parallel.axesLines.brushColor")
    												+ Sbi.settings.chart.configurationStep.htmlForMandatoryFields + ":");
    					}
    				}        			
    			}
    		);
			
			this.axisColNamePadd = Ext.create
			(
				{
					 xtype: 'numberfield',
					 bind : '{configModel.axisColNamePadd}',	
					 id: "parallelAxisColNamePadd",
					 fieldLabel: LN("sbi.chartengine.configuration.parallel.axesLines.axisColNamePadd") + Sbi.settings.chart.configurationStep.htmlForMandatoryFields,	
					 width: Sbi.settings.chart.configurationStep.widthOfFields,
	        		 padding:Sbi.settings.chart.configurationStep.paddingOfInnerFields,
					 maxValue: '30',
					 minValue: '0',
					 emptyText: LN("sbi.chartengine.configuration.parallelAxesLinesAxisColNamePadd.emptyText"),
					 
					 listeners:
					 {
						 change: function(thisEl, newValue, oldValue)
						 {			
							 if (newValue || parseInt(newValue)==0)
							 {
								 this.labelEl.update(LN("sbi.chartengine.configuration.parallel.axesLines.axisColNamePadd")+":"); 
							 }								 
							 else 
							 {
								 this.labelEl.update
								 	(LN("sbi.chartengine.configuration.parallel.axesLines.axisColNamePadd") + Sbi.settings.chart.configurationStep.htmlForMandatoryFields + ":");
							 }								 								 				 
						 }
					 }
				}
			 );
			 
			this.brushWidth= Ext.create
	        (
				{
					 xtype: 'numberfield',
					 bind : '{configModel.brushWidth}',	
					 id: "parallelBrushWidth",
					 fieldLabel: LN("sbi.chartengine.configuration.parallel.axesLines.brushWidth") + Sbi.settings.chart.configurationStep.htmlForMandatoryFields,	
					 width: Sbi.settings.chart.configurationStep.widthOfFields,
	        		 padding:Sbi.settings.chart.configurationStep.paddingOfInnerFields,
//					 value: "20",
					 maxValue: '100',
					 minValue: '5',
					 emptyText: LN("sbi.chartengine.configuration.parallelAxesLinesBrushWidth.emptyText"),
					 
					 listeners:
					 {
						 change: function(thisEl, newValue, oldValue)
						 {							 
							 if (newValue || parseInt(newValue)==0)
							 {
								 this.labelEl.update(LN("sbi.chartengine.configuration.parallel.axesLines.brushWidth")+":"); 
							 }								 
							 else
							 {
								 this.labelEl.update
								 	(LN("sbi.chartengine.configuration.parallel.axesLines.brushWidth") + Sbi.settings.chart.configurationStep.htmlForMandatoryFields + ":");
							 }								 								 				 
						 }
					 }
				}
			);
						
			this.add(this.colorPickerAxisColor);
			this.add(this.axisColNamePadd);
			this.add(this.colorPickerBrushColor);
			this.add(this.brushWidth);
		}
});