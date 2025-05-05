import UpdateDriverLocationUseCase from "../../useCases/Drivercase/UpdateDriverLocationUseCase.js";
import DriverRepository from "../../repository/implementation/DriverRepository.js";


const updateDriverLocationUseCase= new UpdateDriverLocationUseCase(new DriverRepository())

const activeDrivers={}
const driverSocketMap={} 
const rideIdToUserSocketMap={}
export function setupDriverSocket(io){


    io.on('connection',(socket)=>{
        console.log('driverconnected',socket.id)

         socket.on('driverLocation',async(data)=>{
            const {driverId,latitude,longitude,drivername}=data
            
            driverSocketMap[driverId]=socket.id;
           
            
        const updatedlocation=await updateDriverLocationUseCase.execute(driverId,latitude,longitude,)


        activeDrivers[driverId]={
          ...updatedlocation,
          drivername
        }

        io.emit('updateDrivers',activeDrivers)


         })

         socket.on('sent_ride_req',(data)=>{
           const {driverId,rideDetails}=data
          console.log("ride",rideDetails);
          const rideId = rideDetails.rideId;
          rideIdToUserSocketMap[rideId] = socket.id; 
           const driverSocketId=driverSocketMap[driverId]

           if(driverSocketId){
            io.to(driverSocketId).emit('rideRequest',rideDetails,driverId)
           }else{
            console.log(`Driver with Id ${driverId}  is not connected`);
            
           }
         })


         socket.on('driverRespons',({driverId,rideId,status})=>{
          console.log(`Driver ${driverId} responded to ride ${rideId} with: ${status}`);

          const userSocketId=rideIdToUserSocketMap[rideId]
          if(userSocketId){
            io.to(userSocketId).emit('driverResponded',{
              driverId,
              rideId,
              status
            })
          }
         })


      
    socket.on('driverInactive', async (data) => {
      console.log('Received driverInactive:', data);
        const { driverId } = data;
  
      
        delete activeDrivers[driverId];
  
        await updateDriverLocationUseCase.execute(driverId, 0, 0);
  
        // Notify users
        io.emit('updateDrivers', activeDrivers);
      });








      socket.on('disconnect', () => {
        console.log('Driver disconnected:', socket.id);

        for (const [driverId, id] of Object.entries(driverSocketMap)) {
          if (id === socket.id) {
            delete driverSocketMap[driverId];
            delete activeDrivers[driverId];
            break;
          }
        }
      
        // Broadcast updated drivers to all clients
        io.emit('updateDrivers', activeDrivers);
      })

    })
}