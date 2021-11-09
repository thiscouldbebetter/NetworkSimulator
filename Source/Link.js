
class Link
{
	constructor(namesOfNodesLinked, costToTraverse)
	{
		this.namesOfNodesLinked = namesOfNodesLinked;
		this.costToTraverse = costToTraverse;
	}

	node0()
	{
		return Globals.Instance.network.nodes[this.namesOfNodesLinked[0]];
	}

	node1()
	{
		return Globals.Instance.network.nodes[this.namesOfNodesLinked[1]];
	}

	nodes()
	{
		return [ this.node0(), this.node1() ];
	}

	// drawable

	drawToDisplay(display)
	{
		var node0Center = this.node0().center(); 
		var node1Center = this.node1().center();

		display.drawLine
		(
			node0Center, node1Center, "Gray"
		);

		var midpoint = node0Center.add
		(
			node1Center
		).divideScalar(2);

		display.drawText
		(
			"" + this.costToTraverse, 
			midpoint,
			"Gray"
		);
	}
}
