// import Login from "components/Login"
import { Container, Select } from "@mantine/core"
import type { NextPage } from "next"
import { useQuery } from "react-query"
// import SignUp from "../components/SignUp"
import fetch from "../utils/fetch"

const data = [
	{
		image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
		label: "Bender Bending Rodríguez",
		value: "Bender Bending Rodríguez",
		description: "Fascinated with cooking"
	},

	{
		image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
		label: "Carol Miller",
		value: "Carol Miller",
		description: "One of the richest people on Earth"
	},
	{
		image: "https://img.icons8.com/clouds/256/000000/homer-simpson.png",
		label: "Homer Simpson",
		value: "Homer Simpson",
		description: "Overweight, lazy, and often ignorant"
	},
	{
		image: "https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png",
		label: "Spongebob Squarepants",
		value: "Spongebob Squarepants",
		description: "Not just a sponge"
	}
]

const Home: NextPage = () => {
	const {
		data: ping,
		isFetching: pingIsFetching,
		error: pingError
	} = useQuery("test", async () => await fetch.get("/"))

	return (
		<div>
			<p style={{ marginBottom: "32px" }}>
				<p>Can we ping the server?</p>
				{pingIsFetching ? <>Loading...</> : pingError ? <>Uh oh, we got problems.</> : <>{JSON.stringify(ping.data)}</>}
			</p>
			<Container>
				<Select
					size="xs"
					radius="xl"
					initiallyOpened
					label="Choose employee of the month"
					placeholder="Pick one"
					data={[
						{ value: "rick", label: "Rick", group: "Used to be a pickle" },
						{ value: "morty", label: "Morty", group: "Never was a pickle" },
						{ value: "beth", label: "Beth", group: "Never was a pickle" },
						{ value: "summer", label: "Summer", group: "Never was a pickle" }
					]}
					searchable
					maxDropdownHeight={400}
					nothingFound="Nobody here"
				/>
			</Container>
		</div>
	)
}

export default Home
