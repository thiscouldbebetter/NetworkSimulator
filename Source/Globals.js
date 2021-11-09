
class Globals
{
	// instance

	static Instance = new Globals();

	// methods

	initialize
	(
		display, timerTicksPerSecond, network
	)
	{
		this.display = display;
		this.display.initialize();

		this.network = network;
		this.network.initialize();

		var millisecondsPerTimerTick = 
			1000 / timerTicksPerSecond;

		this.timerTicksSoFar = 0;

		this.handleEventTimerTick();

		this.timer = setInterval
		(
			this.handleEventTimerTick.bind(this),
			millisecondsPerTimerTick
		);
	}

	handleEventTimerTick()
	{
		this.network.updateForTimerTick();
		this.network.drawToDisplay(this.display);

		this.timerTicksSoFar++;
	}
}
