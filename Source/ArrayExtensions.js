
function ArrayExtensions()
{
	// extension class
}
{
	Array.prototype.addLookups = function(keyName)
	{
		for (var i = 0; i < this.length; i++)
		{
			var element = this[i];
			var key = element[keyName];
			this[key] = element;
		}

		return this;
	}

	Array.prototype.remove = function(element)
	{
		var indexOfElement = this.indexOf(element);
		if (indexOfElement >= 0)
		{
			this.splice(indexOfElement, 1);
		}
		return this;
	}
}
