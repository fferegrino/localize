function GetPluginSettings()
{
	return {
		"name":			"Localize",				// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"lcze",				// this is used to identify this plugin and is saved to the project; never change it
		"version":		"1.0",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
		"description":	"Bring localization to your Windows Universal App",
		"author":		"@fferegrino",
		"help url":		"Scirra.com",
		"category":		"General",				// Prefer to re-use existing categories, but you can set anything here
		"type":			"object",				// either "world" (appears in layout and is drawn), else "object"
		"rotatable":	true,					// only used when "type" is "world".  Enables an angle property on the object.
		"flags":		0 | pf_singleglobal,		// exists project-wide, e.g. mouse, keyboard.  "type" must be "object".
		"dependency": "sprintf.js"
	};
};

////////////////////////////////////////
// Conditionss
AddStringParam("Key", "The key of your resource");
AddCondition(0, cf_none, "Resource dictionary contains key", "Resources", "Check if your resource dictionary contains the key <b>{0}</b>", "Check if your dictionary contains the specified key", "CheckKey");

////////////////////////////////////////
// Actions

////////////////////////////////////////
// Expressions
AddStringParam("Key", "The key of your resource");
AddExpression(0, ef_return_string, "Get string", "Resources", "GetSimpleString", "Get the string identified by the specified key");
AddStringParam("Key", "The key of your resource");
AddNumberParam("Number", "The number to be formatted");
AddExpression(1, ef_return_string, "Get string and format number", "Resources", "GetNumberString", "Get the string identified by the specified key");

////////////////////////////////////////
ACESDone();

var property_list = [];
	
// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
	return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	// Save the constructor parameters
	this.instance = instance;
	this.type = type;
	
	// Set the default property values from the property table
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
		
	// Plugin-specific variables
	// this.myValue = 0...
}

// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function()
{
}

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function()
{
}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}

// For rendered objects to load fonts or textures
IDEInstance.prototype.OnRendererInit = function(renderer)
{
}

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function(renderer)
{
}

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function(renderer)
{
}