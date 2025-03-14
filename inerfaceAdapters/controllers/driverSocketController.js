import UpdateDriverLocationUseCase from "../../useCases/Drivercase/UpdateDriverLocationUseCase.js";
import DriverRepository from "../../repository/implementation/DriverRepository.js";


const updateDriverLocationUseCase= new UpdateDriverLocationUseCase(new DriverRepository())

const activeDrivers={}


export function setupDriverSocket(io){


    io.on('connection',(socket)=>{
        console.log('driverconnected',socket.id)

         socket.on('driverLocation',async(data)=>{
            const {driverId,latitude,longitude}=data
            console.log("vanuuu");
            
            console.log(driverId);
            
        const updatedlocation=await updateDriverLocationUseCase.execute(driverId,latitude,longitude)


        activeDrivers[driverId]=updatedlocation

        io.emit('updateDrivers',activeDrivers)


         })


      
    socket.on('driverInactive', async (data) => {
        const { driverId } = data;
  
      
        delete activeDrivers[driverId];
  
        await updateDriverLocationUseCase.execute(driverId, 0, 0);
  
        // Notify users
        io.emit('updateDrivers', activeDrivers);
      });


      socket.on('disconnect', () => {
        console.log('Driver disconnected:', socket.id);
      })

    })
}