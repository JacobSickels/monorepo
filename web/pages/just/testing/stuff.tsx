import type { NextPage } from "next"
import { useQuery } from "react-query"
import fetch from "@Utils/fetch"
import { Title, Table } from "@mantine/core"

const MantineTesting: NextPage = () => {
	const { data, isLoading, error } = useQuery<Dog[]>("all-dogs", () => fetch.get("/v1/dogs"))

	if (error) return <p>Error: {error}</p>
	if (isLoading) return <p>Loading..........</p>

	const rows = data
		? data.map((dog: Dog) => (
				<tr key={dog.id}>
					<td>{dog.callName}</td>
					<td>{dog.birthdate}</td>
					<td>{dog.handler ?? "none provided"}</td>
					<td>{dog.sex}</td>
				</tr>
		  ))
		: []

	return (
		<div>
			<Title>All Dogs</Title>
			<Table>
				<thead>
					<tr>
						<th>Call Name</th>
						<th>Birthdate</th>
						<th>Handler</th>
						<th>Sex</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
		</div>
	)
}

export default MantineTesting
