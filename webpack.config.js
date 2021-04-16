module.exports={
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude: /node_moudles/,
                use:{
                    loader: "babel-loader"
                }
            }
        ]
    }
}