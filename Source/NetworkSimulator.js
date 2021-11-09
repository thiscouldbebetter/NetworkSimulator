
class NetworkSimulator
{
	run()
	{
		var display = new Display
		(
			new Coords(400, 300), // sizeInPixels
			10, // fontHeightInPixels
			"White", // colorBackground
			"Gray" // colorForeground
		);

		var network = new Network
		(
			new Coords(20, 20), // nodeSizeInPixels
			5, // timerTicksPerRouteShare
			// nodes
			[
				new Node("Node0", new Coords(30, 30)),
				new Node("Node1", new Coords(90, 90)),
				new Node("Node2", new Coords(150, 150)),
				new Node("Node3", new Coords(90, 210)),

			],
			// links
			[
				new Link( ["Node0", "Node1"], 8),
				new Link( ["Node1", "Node2"], 8),
				new Link( ["Node2", "Node3"], 8),
			], 
			// packets
			[
				// todo
			]
		);

		Globals.Instance.initialize
		(
			display,
			1, // timerTicksPerSecond
			network
		);
	}
}
