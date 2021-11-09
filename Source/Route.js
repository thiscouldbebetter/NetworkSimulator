
class Route
{
	constructor(nodeTargetName, totalCostToTarget, nodeNextName)
	{
		this.nodeTargetName = nodeTargetName;
		this.totalCostToTarget = totalCostToTarget;
		this.nodeNextName = nodeNextName;
	}

	// string

	toString()
	{
		var returnValue = 
			"[route"
			+ " to:" + this.nodeTargetName
			+ " cost:" + this.totalCostToTarget
			+ "]";

		return returnValue;
	}
}
