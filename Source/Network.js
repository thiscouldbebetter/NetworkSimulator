
class Network
{
	constructor
	(
		nodeSizeInPixels, timerTicksPerRouteShare, nodes, links, packets
	)
	{
		this.nodeSizeInPixels = nodeSizeInPixels;
		this.timerTicksPerRouteShare = timerTicksPerRouteShare;
		this.nodes = nodes;
		this.links = links;
		this.packets = packets;

		this.nodes.addLookups("name");
		this.packetsToRemove = [];
	}

	initialize()
	{
		for (var i = 0; i < this.links.length; i++)
		{
			var link = this.links[i];
			var nodesLinked = link.nodes();
			for (var n = 0; n < nodesLinked.length; n++)
			{
				var nodeSource = nodesLinked[n];
				var nodeTarget = nodesLinked[1 - n]; 

				var linkToNeighbor = new Link
				(
					[
						nodeSource.name, 
						nodeTarget.name,
					],
					link.costToTraverse
				);

				nodeSource.linksToNeighbors.push(linkToNeighbor);
			}
		}

		for (var i = 0; i < this.nodes.length; i++)
		{
			var node = this.nodes[i];
			node.initialize();
		}

		this.domElementUpdate();
	}

	routesShareAmongNodes()
	{
		for (var i = 0; i < this.nodes.length; i++)
		{
			var node = this.nodes[i];
			node.routesShareWithNeighbors();
		}
	}

	updateForTimerTick()
	{
		var timerTicksSoFar = Globals.Instance.timerTicksSoFar;
		if 
		(
			timerTicksSoFar != 0 
			&& timerTicksSoFar % this.timerTicksPerRouteShare == 0
		)
		{
			this.routesShareAmongNodes();   
		}

		this.packetsToRemove.length = 0;

		for (var i = 0; i < this.packets.length; i++)
		{
			var packet = this.packets[i];
			if (packet.isDelivered() == true)
			{
				this.packetsToRemove.push(packet);
				packet.nodeCurrent().packetsDelivered.push(packet);
			}
			else
			{
				packet.updateForTimerTick();
			}
		}

		for (var i = 0; i < this.packetsToRemove.length; i++)
		{
			var packet = this.packetsToRemove[i];
			this.packets.remove(packet);
		}
	}

	// dom

	domElementUpdate()
	{
		if (this.domElement == null)
		{
			var d = document;

			var divNetwork = d.createElement("div");

			var divControls = d.createElement("div");

			var labelCommand = d.createElement("label");
			labelCommand.innerHTML = "Command:";
			divControls.appendChild(labelCommand);

			var inputCommandText = d.createElement("input");
			inputCommandText.id = "inputCommandText";
			inputCommandText.value = "packet Node0 Node3 data"
			divControls.appendChild(inputCommandText);

			var buttonCommandPerform = d.createElement("button");
			buttonCommandPerform.innerHTML = "Do";
			buttonCommandPerform.onclick =
				this.buttonCommandPerform_Clicked.bind(this);
			divControls.appendChild(buttonCommandPerform);

			var buttonCommandHelp = d.createElement("button");
			buttonCommandHelp.innerHTML = "Help";
			buttonCommandHelp.onclick = this.buttonCommandHelp_Clicked.bind(this);
			divControls.appendChild(buttonCommandHelp);

			divNetwork.appendChild(divControls);

			d.body.appendChild(divNetwork);

			this.domElement = divNetwork;
		}
	}

	buttonCommandHelp_Clicked()
	{
		var message = "Valid command format: 'packet [from] [to] [data]'";
		alert(message);
	}

	buttonCommandPerform_Clicked()
	{
		var inputCommandText = document.getElementById("inputCommandText");
		var commandText = inputCommandText.value;
		var commandArguments = commandText.split(" ");
		var operationName = commandArguments[0];
		 
		if (operationName == "packet")
		{
			if (commandArguments.length != 4)
			{
				alert("Wrong number of arguments!");
			}

			var nodeNameSource = commandArguments[1]; 
			var nodeTargetName = commandArguments[2];
			var payload = commandArguments[3];

			var nodeSource = this.nodes[nodeNameSource];
			var nodeTarget = this.nodes[nodeTargetName];

			if (nodeSource == null)
			{
				alert("Invalid source node name: " + nodeNameSource);
			}
			else if (nodeSource == null)
			{
				alert("Invalid target node name: " + nodeNameSource);
			}
			else
			{
				var packet = new Packet
				(
					nodeNameSource, nodeTargetName, payload
				);
				this.packets.push(packet);

			}
		}
		else
		{
			alert("Unrecognized command!");
		}
	}

	// drawable

	drawToDisplay(display)
	{
		display.clear();

		for (var i = 0; i < this.links.length; i++)
		{
			var link = this.links[i];
			link.drawToDisplay(display);
		}

		for (var i = 0; i < this.nodes.length; i++)
		{
			var node = this.nodes[i];
			node.drawToDisplay(display);
		}

		for (var i = 0; i < this.packets.length; i++)
		{
			var packet = this.packets[i];
			packet.drawToDisplay(display);
		}

		display.drawText
		(
			"Time:" + Globals.Instance.timerTicksSoFar, 
			new Coords(10, 10), 
			"Gray"
		);

		display.drawText
		(
			"Routes shared every " 
				+ this.timerTicksPerRouteShare 
				+ " ticks.", 
			new Coords(10, 20), 
			"Gray"
		);
	}
}
