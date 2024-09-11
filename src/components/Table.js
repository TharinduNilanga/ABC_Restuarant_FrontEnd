// import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
// import React from "react";

// export default function userTable({ rows,selectedUser /*deleteUser*/ }) {
//     return (
//         <TableContainer component={Paper}>
//             <Table>
//                 <TableHead>
//                     <TableRow>
//                         <TableCell>ID</TableCell>
//                         <TableCell>Name</TableCell>
//                         <TableCell>Action</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {
//                         rows.length > 0 ? rows.map(row => (
//                             <TableRow key={row.id} sx={{ '&:last-chiled td, &:last-chiled th': { border: 0 } }}>
//                                 <TableCell component='th' scope="row">{row.id}</TableCell>
//                                 <TableCell component='th' scope="row">{row.name}</TableCell>
//                                 <TableCell>
//                                     <Button
//                                         sx={{ margine: '0px 10px' }}
//                                         onClick={() => selectedUser({ id: row.id, name: row.name })}
//                                     >
//                                         Update
//                                     </Button>
//                                     <Button
//                                         sx={{ margine: '0px 10px' }}
//                                         // onClick={() => deleteUser({ id: row.id })}
//                                     >
//                                         Delete
//                                     </Button>
//                                 </TableCell>
//                             </TableRow>
//                         )) : (
//                             <TableRow sx={{ '&:last-chiled td, &:last-chiled th': { border: 0 } }}>
//                                 <TableCell component='th' scope="row">No Data</TableCell>
//                             </TableRow>
//                         )
//                     }
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     )
// }
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


const UsersTable = ({ rows,selectedUser, deleteUser }) => {
    return (
<TableContainer component={Paper}>
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {
                rows.length > 0 ? rows.map(row => (
                    <TableRow key={row.id} sx={{ '&:last-chiled td, &:last-chiled th': { border: 0 } }}>
                        <TableCell component='th' scope="row">{row.userId}</TableCell>
                        <TableCell component='th' scope="row">{row.firstName}</TableCell>
                        <TableCell component='th' scope="row">{row.lastName}</TableCell>
                        <TableCell component='th' scope="row">{row.address}</TableCell>
                        <TableCell component='th' scope="row">{row.email}</TableCell>
                            if(row.role === 1){
                                <TableCell component='th' scope="row">Admin</TableCell>
                            } else if( row.role === 2){
                                <TableCell component='th' scope="row">Staff</TableCell>
                            }else{
                                <TableCell component='th' scope="row">Customer</TableCell>
                            }
                        
                        <TableCell component='th' scope="row"></TableCell>
                        <TableCell>
                        <Button
                                sx={{ margine: '0px 10px' }}
                                onClick={() => selectedUser({ id: row.id, name:row.name })}
                            >
                                Update
                            </Button>
                            <Button
                                sx={{ margine: '0px 10px' }}
                                onClick={() => deleteUser({ id: row.id })}
                            >
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                )) : (
                    <TableRow sx={{ '&:last-chiled td, &:last-chiled th': { border: 0 } }}>
                        <TableCell component='th' scope="row">No Data</TableCell>
                    </TableRow>
                )
            }
        </TableBody>
    </Table>
</TableContainer>
    )

}

export default UsersTable;
