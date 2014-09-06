json.array! @journeys do |journey|
	json.duration journey.duration
	json.startDateTime journey.start_date_time
	json.arrivalDateTime journey.arrival_date_time
	json.summary(journey.legs) do |leg|
		json.text leg.instruction.summary
	end
	json.fullInstructions do
		json.array! journey.instructions.values.flatten
	end
	json.mapPath do
		json.array! journey.map_path
	end

end

