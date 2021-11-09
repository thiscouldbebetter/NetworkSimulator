
class Node
{
	constructor(name, pos)
	{
		this.name = name;
		this.pos = pos;

		this.linksToNeighbors = [];
		this.routes = [];
		this.packetsDelivered = [];
	}

	center()
	{
		return this.size().clone().divideScalar(2).add(this.pos);
	}

	initialize()
	{
		for (var i = 0; i < this.linksToNeighbors.length; i++)
		{
			var link = this.linksToNeighbors[i];

			var neighborName = link.namesOfNodesLinked[1];

			this.linksToNeighbors[neighborName] = link;

			var route = new Route
			(
				neighborName, // nodeTargetName, 
				link.costToTraverse, // totalCostToTarget, 
				neighborName // nodeNextName
			);
			this.routes.push(route);
		}

		this.routes.addLookups("nodeTargetName");
	}

	routesShareWithNeighbors()
	{
		for (var n = 0; n < this.linksToNeighbors.length; n++)
		{
			var link = this.linksToNeighbors[n];
			var nodeNeighbor = link.node1();
			nodeNeighbor.routesUpdateFromNeighbor
			(
				this.name, 
				link.costToTraverse, 
				this.routes
			);
		}
	}

	routesUpdateFromNeighbor
	(
		neighborName, costToNeighbor, routesFromNeighbor
	)
	{
		for (var r = 0; r < routesFromNeighbor.length; r++)
		{
			var routeFromNeighbor = routesFromNeighbor[r];

			var totalCostToTargetThroughNeighbor = 
				costToNeighbor + routeFromNeighbor.totalCostToTarget;

			var nodeTargetName = routeFromNeighbor.nodeTargetName;

			if (nodeTargetName == this.name)
			{
				// do nothing
			}
			else 
			{
				var routeExisting = this.routes[nodeTargetName];
				if (routeExisting == null)
				{
					var routeNew = new Route
					(
						nodeTargetName, // target
						totalCostToTargetThroughNeighbor, 
						neighborName // nodeNextName
					);
	 
					this.routes.push(routeNew);
					this.routes[nodeTargetName] = routeNew;
				}
				else if
				(
					routeExisting.totalCostToTarget
					> totalCostToTargetThroughNeighbor
				)
				{
					routeExisting.totalCostToTarget = totalCostToTargetThroughNeighbor;
					routeExisting.nodeNextName = neighborName;
				}
			}
		}
	}

	size()
	{
		return Globals.Instance.network.nodeSizeInPixels;
	}

	// drawable

	drawToDisplay(display)
	{
		var network = Globals.Instance.network;

		display.drawRectangle
		(
			this.pos, network.nodeSizeInPixels, "White", "Gray"
		);
		display.drawText(this.name, this.pos, "Gray"); 


		var textPos = this.center();
		textPos.y += display.fontHeightInPixels;

		for (var i = 0; i < this.routes.length; i++)
		{
			var route = this.routes[i];
			display.drawText(route.toString(), textPos, "Blue");
			textPos.y += display.fontHeightInPixels;
		}

		for (var i = 0; i < this.packetsDelivered.length; i++)
		{
			var packet = this.packetsDelivered[i];
			display.drawText(packet.toString(), textPos, "DarkGreen");
			textPos.y += display.fontHeightInPixels;
		}
	}
}
