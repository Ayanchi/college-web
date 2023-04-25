import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import { getDocs, collection, query } from "firebase/firestore";
import { database } from "../../app/firebase";
import { Link } from "react-router-dom";

export default function TeamRate() {
  const [getTeam, setGetTeam] = useState([]);
  const [stages, setStages] = useState([]);

  useEffect(() => {
    const getFormList = async () => {
      try {
        const q = query(collection(database, "teams"));
        const data = await getDocs(q);
        const filterForm = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setGetTeam(filterForm);
      } catch (error) {
        console.log(error);
      }
    };
    getFormList();
  }, []);

  useEffect(() => {
    const getFormList = async () => {
      try {
        const q = query(collection(database, "stages"));
        const data = await getDocs(q);
        const filterForm = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setStages(filterForm);
      } catch (error) {
        console.log(error);
      }
    };
    getFormList();
  }, []);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sx={"background:red;"} width="100px">
                Команды
              </TableCell>

              {stages.map((stage, index) => (
                <TableCell key={index} align="center">{stage.title}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          {getTeam.map((command, index1) => (
            <TableBody key={index1}>
              {/* {getTeam.map((comand) => ( */}
              <TableRow key={command.id}>
                <TableCell sx={"background:red;"}>{command.teamName}</TableCell>
                {stages.map((item, index2) => (
                  <TableCell align="center">
                    <Link to={`/college-web/admin/${command.teamName}`}>
                      {command.grades[index2] ? command.grades[index2] : 0}
                    </Link>
                  </TableCell>
                ))}
              </TableRow>
              {/* ))} */}
            </TableBody>
          ))}
        </Table>
      </TableContainer>
    </Paper>
  );
}
