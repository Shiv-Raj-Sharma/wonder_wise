const errorMiddleware = async (err, req, res, next)=>{
    const statusCode = err.status ?? res.statusCode ?? 500; // nullish coalescing  

    res.status(statusCode).json({  //  we dont know error so statusCde is used as parameter
        sucess: false,
        message: err.message || "something went wrong",  
        stack: process.env.NODE_ENV === "process" ? null: err.stack,
        ...(err.errors?.length > 0 && {  // ...() is use when we want to add any property in json object   /// err.errors?.length here ? is used after ? code doesnotexecute to save from crash when we are unsure when property exists or not
            errors: err.errors.map((error) => ({
                field: error.path,
                message: error.msg,
            })),
    }),

    });
}
  // just need to create once and then only need to make little changes further
export default errorMiddleware;
