
class Packet
{
	constructor(nodeSourceName, nodeTargetName, payload)
	{
		this.nodeSourceName = nodeSourceName;
		this.nodeCurrentName = this.nodeSourceName;
		this.nodeTargetName = nodeTargetName;
		this.payload = payload;

		this.nodeNextName = null;
		this.ticksTowardNodeNext = 0;
	}

	fractionTowardNodeNext()
	{
		var returnValue = 
			this.ticksTowardNodeNext 
			/ this.linkCurrent().costToTraverse;

		return returnValue;	 
	}

	isDelivered()
	{
		return (this.nodeCurrentName == this.nodeTargetName);
	}

	linkCurrent()
	{
		return this.nodeCurrent().linksToNeighbors[this.nodeNextName];
	}

	nodeCurrent()
	{
		return Globals.Instance.network.nodes[this.nodeCurrentName];
	}

	nodeNext()
	{
		return Globals.Instance.network.nodes[this.nodeNextName];
	}

	updateForTimerTick()
	{
		if (this.nodeNextName == null)
		{
			var nodeCurrent = this.nodeCurrent();
			var route = nodeCurrent.routes[this.nodeTargetName];
			if (route == null)
			{
				// Drop the packet?
			}
			else
			{
				this.nodeNextName = route.nodeNextName;
			}
		}
		else
		{
			var linkCurrent = this.linkCurrent();
			if (linkCurrent != null)
			{
				this.ticksTowardNodeNext++;

				if (this.ticksTowardNodeNext < linkCurrent.costToTraverse)
				{
					// todo
				}
				else
				{
					this.nodeCurrentName = this.nodeNextName;   
					this.nodeNextName = null;
					this.ticksTowardNodeNext = 0;
				}
			}

		}
	}

	// drawable

	drawToDisplay(display, network)
	{
		var pos = this.nodeCurrent().center().clone();

		if (this.nodeNextName != null)
		{
			var fractionTowardNodeNext = 
				this.fractionTowardNodeNext();

			pos.multiplyScalar
			(
				1 - fractionTowardNodeNext
			).add
			(
				this.nodeNext().center().clone().multiplyScalar
				(
					fractionTowardNodeNext
				)
			);
		}

		display.drawText(this.toString(), pos, "Red"); 
	}

	// string

	toString()
	{
		var returnValue = 
			"[packet"
			+ " from:" + this.nodeSourceName 
			+ " to:" + this.nodeTargetName
			+ " data:" + this.payload 
			+ "]";

		return returnValue;
	}

}
