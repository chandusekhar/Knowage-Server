<md-content layout-fill>
    <md-card >	
     	<md-card-content layout="row" layout-align="space-around center">
     		<dataset-selector flex ng-model=model.dataset.dsId on-change="resetValue(dsId);"></dataset-selector>  	
		   	<div flex>
				<md-switch ng-model="model.content.fixedRow" aria-label="Fixed Rows">
					 Fixed Rows Per Page
				</md-switch>
		     </div>	
			<md-input-container flex class="md-block"> 
				<label>{{translate.load('sbi.cockpit.widgets.table.tabledesignerpanel.tableoptions.maxrowsnumber')}}</label>
					<input class="input_class" ng-model="model.content.maxRowsNumber" type="number">
			</md-input-container>
		</md-card-content>
	</md-card>
	<md-card >	
		<md-card-title>
              <md-card-title-text layout="row">
                    <span flex class="md-headline">{{translate.load('sbi.cockpit.widgets.table.tabledesignerpanel.tableoptions.tablecolumns')}}</span>
                    <span flex></span>
                    <md-button flex="10" class="md-icon-button" ng-click="openListColumn()">{{translate.load('sbi.cockpit.widgets.table.tabledesignerpanel.tableoptions.addcolumn')}} </md-button>
                    <md-button flex="20" class="md-icon-button" ng-click="addNewCalculatedField()">{{translate.load('sbi.cockpit.widgets.table.calculatedFields.add')}}</md-button>
                     
              </md-card-title-text>
        </md-card-title>
     	<md-card-content layout="row" layout-align="space-around center">
     		<div layout="row" ng-if="showCircularcolumns.value" layout-sm="column" layout-align="space-around">
      			<md-progress-circular md-mode="indeterminate"></md-progress-circular>
   			 </div>
	  		<angular-table flex ng-show="model.content.columnSelectedOfDataset.length>0 && !showCircularcolumns.value"
			id='metadataTable' ng-model="model.content.columnSelectedOfDataset"
			columns='metadataTableColumns'
			columns-search='["name"]' show-search-bar=true
			no-pagination=true  scope-functions="functionsCockpitColumn"
			speed-menu-option= actionsOfCockpitColumns
			> </angular-table> 
			 
			
	    	
     	</md-card-content>
    </md-card>
	
</md-content>