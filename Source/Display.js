
class Display
{
	constructor
	(
		sizeInPixels,
		fontHeightInPixels,
		colorBackground,
		colorBorder
	)
	{
		this.sizeInPixels = sizeInPixels;
		this.fontHeightInPixels = fontHeightInPixels;
		this.colorBackground = colorBackground;
		this.colorBorder = colorBorder;
	}

	clear()
	{
		this.drawRectangle
		(
			Coords.Instances().Zeroes,
			this.sizeInPixels,
			this.colorBackground,
			this.colorBorder
		);
	}

	drawLine(posFrom, posTo, color)
	{
		this.graphics.strokeStyle = color;
		this.graphics.beginPath();
		this.graphics.moveTo(posFrom.x, posFrom.y);
		this.graphics.lineTo(posTo.x, posTo.y);
		this.graphics.stroke();
	}

	drawRectangle(pos, size, colorFill, colorBorder)
	{
		this.graphics.fillStyle = colorFill;
		this.graphics.fillRect(pos.x, pos.y, size.x, size.y);

		this.graphics.strokeStyle = colorBorder;
		this.graphics.strokeRect(pos.x, pos.y, size.x, size.y); 
	}

	drawText(text, pos, color)
	{
		this.graphics.fillStyle = color;
		this.graphics.fillText
		(
			text, pos.x, pos.y
		);
	}

	initialize()
	{
		var canvas = document.createElement("canvas");
		canvas.width = this.sizeInPixels.x;
		canvas.height = this.sizeInPixels.y;

		this.graphics = canvas.getContext("2d");

		this.graphics.font = 
			this.fontHeightInPixels + "px sans-serif";

		document.body.appendChild(canvas);
	}

}