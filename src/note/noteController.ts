import { NextFunction, Request, Response } from "express";
import envConfig from "../config/config";
import noteModel from "./noteModel";
import createHttpError from "http-errors";
import { NetConnectOpts } from "net";



const createNote = async (req:Request, res:Response, next: NextFunction)=>{
    try{

        const file = req.file ? `${envConfig.backendUrl}/${req.file.filename}` : 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAngMBEQACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQMEBQYCB//EAEYQAAEDAwEFBQQGBgYLAAAAAAECAwQABREhBhITMUFRYXGBoRQiMpEHI0JSscFDYnKS0fAVFjRTorIXJDNEc4KT0uHi8f/EABsBAQADAQEBAQAAAAAAAAAAAAACAwQFBgEH/8QAMxEAAgIBBAEDAgUDAwUBAAAAAAECAxEEEiExBRNBUSIyFGGRobEzQnFSgcEVI0NT8Ab/2gAMAwEAAhEDEQA/APcaAKAKAKAKAKATNAGR20AZFALQBQBQBQBQBQBQBQBQBQBQBQBQBQBQBQBQEC+JcNomlh5bLqWFqQ42cKSQCQRQHkN02lnPfRBEurVwu6LqHEKelI4yEnK91Q3gAjHLQdaA3f0gyZLOzHstmlojzlt8aOXXdVBrCynJOpJ3U8/tUBcbH39naXZyDdmcDjtjiIBzuODRSfI5oC6oAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoCPObU/EeZbUlKnEFIUoZAyMcqAxbf0dp/qF/VB66KVD4m9xgzhzG/v4+LHxd3LTvoDTw7Y5HkpkPy1PFMdDARw0gDdJ94d5zrrjQcqAibLbLxdmTNEGVMdbmPqkLbfUgpStR13QlIx4UBfnlpQGTte1E647S3+x+zRo79qQ2UrUtSw6VjeScaYGMZ8aATYPaeTfdlF3q7GO2ttx4OojoIS2Gye0knQZoDn6PtpZl5an269tCPe7a8USmQR8KjlCh2jGme7PWgNhQBQBQBQBQBQBQBQBQCE4oCruF/gQVFtSy6+P0TQ3lDx6DzrHqddRp19cjRTpbbeYrj5Kr+mbxOP+ow0MN9FK+sJ/AD1rkz8xbP+hXx8s1LSU1/1Z8/kcmJfHv8Ab3RSc9ElKf8AKM1Q9R5CXc0ie7SR6hkBa7kNRd38/wDGUaj62uX/AJf2Hqaf/wBZ0kX6Pqi4NvgfZeQk+oANWQ1+th21I+OOll/a0Ps7QSIx3bpAWkf3zHvJ8xzHlmt1XmI9XRcf3RU9Epf0pZ/J9l3DnRprXFiPIdR2pPLuPYa61dkLI7oPKMU4Sg8SWDEN2F7/AEoXK6P2UyLZLhtoL7gbIDycfZJzyAGcVMiN7JbLXmz2O72t2PGDUy5KktAySndZUU5Qd0HBwnGmedAWj2xZRtlF2itMxuAtDJZlNcEue1p/WUVDGMDB1OgoDX0AUAmaAWgCgCgCgCgG33m2GluvLCG0DKlKOABXyUlFZZ9SbeEZSXdJ16dLFv348XqvO6tY7Sfsj18K85qvKWXSdWm6+TqV6auiO+7l/BJgWmJDSPdS4sa6gYHlWKGnhF7pcs+WaiyzjpFgXB0q9zM6gcF2oOZNRG1OVBzJbTgu1DeSURtTgwR29tRcyWwqpjHs73tcJamHgdS3pnx7R3Gqo3z0731PH5GmKVi2WLJcWa/iS4mLPSlqSdELT8Dp7B2Hu+RNel0HlK9T9MuJfyc7U6KVX1R5RoMCuqYhaAxlv2ouEnbC+WOYuDEZt7Ta2nyk5c3xkE5VjTs69ooDn6NtqJe0Gyr94vDrQdaedQ6lpO6hsI105nkc6mgHNgNpZV2dulqvLfBu9ukHiNnq0slTZ78A48h20BsaAKAKAKAQkDnpQGPnSV3+buNki3sq909HD97v7h515fyOsepn6Nb+ld/mdeitaaG+X3P9ixaDbDfDaSEpFZYuMFiJVLM3mQqna+OY2jPtKFOLbDiStHxJzqnxqLlxlk1FEK7Tkw4S5S5TMVtr3luvjKcdnMVKr65bUstn3aZOLtpdboXBZbE5JbScJlKPDaV3je/DnWqzSV1c2TwTUV7mgtM+c8yUXSCuM8lIyrfSpC8/dwcjwIrDqPSj9VcsoRjkmKfwe6sjtWSxQEE2I9llbjSiR8O+M1apprlHxwkuUQp0QIHVbSvSqZxdbUos1VWb1h9l3s1eFLWIM5ZU7g8F0/pAPsn9Yeor1XivI/iI+nP7l+5ydbpPTfqQ6/g0gOa7JzzEtWGan6Spt7Xbmnbe/DQyFLUgrDiTneAPTpnn3UBH2Z2TvVqtN2tzqLeWJ9yVJCQ+v3WVqG82cI5lKcadvdqBYv7HqRtfC2htsxENTLKmZDPCK/aUnopRVpjpQGmflxoqd6TIaZT2uLCfxqMpxisyeCUYSl9qyNxrpb5S9yLOjPL+626lR9DUIXVzeIyTPsq5w5kmiXkVaQFoDPbWTVJabtzBw5J+Mg6pbHP58vDNcny2rdFWyP3SN2hoU575dIjR0pjspbRoANemtebjiEcI1TbnLcxS7XxzPu0y+0m0k2JKRbLRb3JFxfBLe9gJSkHBVg9O84HjW2jTxlH1LJYihgr7PZtq40ll6VfWA3xQ4/HS0FhYzqN7AJOOvTyqd2r0ri4qGSW009xhRrnEcizmUvMOEFSFciQQR6iuZXdZVLdB4ZLah1CG2W0ttpShtA3UoSMADsAqEnKT3SfJJRx0IVIFQwiSTK27SoUSOuRN3lNtoKijUggczu9av09c7HtrR9SZhdmtojdtq3USEJTGkN7rTeNE45eddXW6X09NmPaL3HauD0FvjIaUy45vpz7pJ1I7++vPzsT6K0lnIy4lWhQpSFpO8haeaSORFfarZVzU49otcVKOGbax3EXGAh0gJdSdx1I+yofl1Hca99pdQtRSrEeb1FTpscWcSL9bI7hbcloK0nUNpK8eO6Dilms09bxOaQhp7p9ROjfLaIxk+2MloaZB1z2bvPPdivv4qnZv3LB89C3dt28lFMv0ua4W4YVEY++cFxX5J9T4VwNZ5x/bR+p0atBGK3WcsZixGeJxFp31nmtZ3lHxJ1rkxnO6WbG2Xye1YRaqgwpTe46yk9ihopJ7Qa6dUK/bj/BidlkX2P2WU8iQ/bZay44yApt083Ed/ePzFdnQ6l2J1z7j+6KL61hWR6ZcK0FdEzGCkSzLur8s6oU5uoH6idB89T514jyWpd2qeOlwj0Onp9OhR9yxX9WgbxyapniMcspjlshmSnihorG+dQnris+ZNZwXbThqKw3Kelhv694JSpR57o5DuGp07TVjsnKCg+kRUeeB1ToA6VDhEtuRtUg18cySgMuSAlJUpQSkcyTgCo7nJ4SJqKO4saZOILKOE0ebroIGP1U8z6Cuvo/D36hqVn0xMmo1lVPC5ZS/Sd7PZtjnozaj7ROcQ3vqOVqAIUry0xgaa16aOmq0tW2tGPSWWarUqUukeTbNvFi/QXR0eTWPUx3UyX5Hel0e7LFeJaMyZHcTpRMuTG4ZdeL4bdWiM7gLSk44pH5fjW+GqtordUH2UXQg5KTXKLRiOlKAlCQlIGgAwBVMYZ5KZT+SNcYIWjitpAfRqhXb3HuNTSxw+mThZhjEVwLCVjkoA1lktssF81wWbK9K0VywZZRJbUgNjJNbIXKJRKvI3biuZfFrRkBuOoKPZvKTgf4T8q6XiN9t07F10V6jFdSj+ZeXuQYlomPo+NDKtz9rGnriu9qJ+nVKXwjDTDfZGPyzDRwlrhJPwowPIV+euX1bmenksxeB+4vuOpS2wvdLiikLxnd0J/LFWqcZycn0jNCG3sy9s2uhpmf0W8wY0zicPVQCVK71Ht7zXTl422xKVbymTnFRjufRqjHuKj/YXQf20f8AdUf+ja1+y/UzfjdMv7v5O0265Of7u2n9t3l8gatj4DVSf1NIg/I0LrP6D7VgkrP10tCB1S03k/vH+Fbav/z0F/Unn/BRPyv+iP6llFssOOoOcLiOjk46d4jwzoPKuxp9BptP9keTDbq7rfufH6HN+vVs2fhmVdZKWUfYQdVuHsSOprVKaXLKqqZWPEEeAbb7Uv7VXb2lbZajNAojsk53E51J7z1+XSsNk97PS6TSx08Me5XbPNqevcJtA1LyazXvFUn+Rql0e9L614pmREKeSGdxBwpwhAI6Z5+ma+0rMs/BbEkQi0l1mOCEbwwjs06VOuLnLJTa2k2XSWi1zGfCtyr29mPduIN0koix1OKGvJCRzUroBUJLcy2uLbwUbHtDTaAWCUJSBz9/PXT+TWexQk3h8m7KJTdwYTot0I7Qv3T8jVfp2LpEHDPRKiKfuSgm3tl1OcF3k2jxPXwGTW7SeP1GpfWF8ma2yFP3dmrtNuRbo3DSorcWd51wjVavy7AK9hpdPDT1quBx7rZWy3Mi7WqxZXB95xsf4xVPknjSTf5FuiWb4mSRzrwjPQvokIqKKpHmH0nWkxbmme2n6qQMKIHJQr0/idRvq2PtFlcsrBM2O+kyXZ2m4N5aVOhpwEOA/Wtjs1+Idx5dvSu7C9x4Zz9T42Nj3V8P9jfMfSfsettKnLg8yo80uRnCR+6CPWr/AFos5ktBdF4wNTPpb2RjIyxIlS1fdajKT6r3aeoiK0tr4wYu/wD00z5AU1YYLUJB/Sv/AFjnkPhHrUHYy+GkS+5nnE+6TbnKVJuMt6S+vmt1ZUfDuHcKpllnQq2xWEjhCs1W0boTya/6NbcZm0SHin6uMnfJ7+lc7yVuyhr5FssRPX115WRnRBnc2FfddHqCPzpV/d/gtgIsNls8Ue6PeyDgp7waRck8xJSjnomQpF1WwMOtFJ1TxUEqA6ZIIGa3+rjgxTrqycqYXxeNIcLrvaRgDwHSst02+OkWwxjCEPcKylonDW6QEpyasri5PCG5R5Zb7MtqYu0yOlW8jgoWsdAvJA9B6V6rwanHfB9LBy9fJTjGfvyaivQHNKfaxObI8furbUfJYrF5GO7SzX5GrRPF8TIp0NeCZ6IkINQKZEPaC0tXq1PRHB7xGW1fdV0rZpL3RYpojGW15PDpsR6DLcjSUFDjaiCDXr4SU4qUejUpJogu5Jq6KM9rI6tKsMTYlCOSyt1juVw1ixVrT97GlVysijVVpbZrd0vzO5VqnW9YTJYUnXGg69lQ3xl0afQsrWX0ex7A2P8AoazBT6MSpHvr7QOgrzPkdT6tuF0iiyW6RoVVypBEOahTjDgQMqxlPiNR60peJrJZEbXiRGO4dHUHB8R/5qa+iXPsTLq0yGpEEJThLqNHEdQa3QUdmDm3RlGfJzLAHjWW9YLq2R2mVOHHIdSaphW5lkp7RZE9iGnhRQH5JHJJ0T3k1tg4VR+nv5/+7KlXO15lwiy2LzwZiXQFPh0KW5r7wIGPlr/Oa9J4WUZUPavcxeRjixfGDTV2DnkS7RvbLZKjDm60pIPYSNPWqrob65R+UTqnsmpfBgWV8RtK+RUASOyvzycXGTT9j1PZJQrSqmVyOFPOuLLcfCQk7qnSM69gHXxq9bYLMvf2K8FW9s3b75JU9NbC0oOFPL+NZHQY5Ct1GqtrWE8f8HyVjgsLsavOxtjkwXGI0RDbgSd1xKcEGkPJWwtT3NoJykvqPJLTYVT7o5EdcDTbKilxfgeleqlalFSXufdPpXdJ56RrH9mrBHYw2FOODt51n9ax9s6lejr4zWsD8eZIioLTSwGuhAwfA1HGTW4Rk+S+2fsrlxdTOuI3mUkFAUPjI5eVczW6vatkHyc7V6mKXpwNio1xJM5qQ0daqZNAKAr0j2d4x1cjlTeeo6jy/Crprct6/wBy2LyhxiOH7ghKXVtKLajvIxk4IwNefM1bSlKLTK7pbYlg5bZaRj2xojvYOf8ANVk9NX3yZ43r4I7kJeMPSnFDqlsbg/j61RJRhwl+pap55wctx2mW1OqAaYRqT21GEZz5ZOU/7Y9mn2ZiOR4BefRw3ZK+IUH7A5JHyA8zXtfG6b8PQk+3ycXV2qyzjpFzXQMoh5UBgblG9iucmPjCN/iN/sq19DkeVeJ8vR6WpbXT5PRaK31KV8oYU7wm1rP2QT8q5ajukkaWhxhoswgB8SWyf+bGfxqzG6zJQ3ySIjITEZCRoGx56VOcG5NlbnyV9x4q1vNB1TTYQEjhj31LVnAGanVCMcSayTT4KizbBQoDTj0ic8p97VWoNdO3yM5pNNIlXqZ1NqtEebs2v2tDUWQjdVnBcOAMV8q8l9L3ro6Edc1HM0T4Gz8KEsOyFe1vDknkgH86zXa+diwuEZ7NVbbx0i9ZCysOOEAAe6kchpWByMrSxhDpJNQPi4ACvuBk6CaltItkSRH9tmx4YB3nHEpyOaRzUR5ZrVoqXdqIwXXuSlP0qnMs39mrjHkNv2+Sy7w1ZSH8oVjqCUgg/IV3Z+F2Sbqlx8MwrXwnHbYv0Fk3BCPdlsvRnOodTp5KGh+dc7UUXReHB5PtUU+U00RUP+0LAjx35Hc22cfM6etZa9HfbLCg/wCC9yjBcywWsGyPPutv3UoCGzluK2cpHYVHqfTxr0Wj8Yq2p28te3sYbdUsONf6+5oRyrsGEWgEOooDK7acLiROHhU0b2Ecst9cnoM4/nNcLziqdS3vD9jp+Nc1J46M661LWwtIS0veSRoop5jvry0XXuXJ1nIs4ZS8w2r7Kkj8KklibM8yZCaDMJppZBU2kJyOuNBWpuLyyht5yV70ZSriuQsgJSndSka6/ePZzIqmyaUNqLoPjBxIc4YGElSlnCE55mssIb3j2LUcNQyV8SQ5vLGgCBhKe3/7VrksYiHNvokoaQk+6nXtqJFt+46E0wRyKE1JRPmTrdqW0+CqIQgqVyFSawh3wiRspFL8h65OD3Rltk+fvH8vI16LwmlcIO6S5fRk8hb1Uvbs1PSu+csMUAYoAAxQC0AUAGgMztI0tiYqUppxxh1gNqWhJUW1JJI0HQ73pXD8xp52JSisnQ0c1jbnDyZ5Mpge6pwAnQb2ma8pKi6P1OLOu8PpktrDKEoQMISAAB0qO95yytrI+HSBU95DYce86vA69ah9U3hEuIojAZuJAzhpv1Uf/U1Yo4g/8n1v6SYE0wRydBNfVEiLu1PaMnQTUlEjk63ep5VLB8yQuG7dpghRCUjmtwfYT97x6Dvq/R6R6u3avtXZKdi09e99+xtYsduNHbYZQEttjdSnsFe0jFRiox6OFKTk8seqR8CgCgCgCgCgCgEIz1oBuQw3IYWy+lLjaxhSVDIIqMoqSwz7FuLyjFTrO9Y3CULLltUcIKtVMHsJ6jvryvlPFuv/ALtS4Ozp9WrvplxL+RWWlOctBXDhVKZolNR7LJlhDLfEdISkDJJrp1aeMI5l0Y52OTxEqYJ4y5EoD3Xl+5p9kaD86zTXsa3wlH4Ju7UVEhk6CantPjZ1gdakokTlxxDScuKA/OjcYrLPqTl0QkGVdHzGgo0HxuH4W/2v4VdptJbrJYisR+SU5w063S7NbabYzbI/CZypStXHFfEtXaf4dK9dp9PDTwUII4110rpbpE6ryoKAKAKAKAKAKAKAKAKA4cbQ4hSHEJUlQwUqGQR318aTWGE8coz72zJbUVW2YuOMaNrTvpHhqCPWuRf4aqct0HtZuhrpYxYslFcLdeWzi4h55kdY+VJI7x8XpXJ1PjtVXylu/wB/+DfTqNO/t4YjVzbzwxwsp03Ad0jy6VzJSsh98S/0VL7WSBOH90r51H14/BF0P5OXrohtOVBKB2rWBUldniKPv4d/IjMibO/sMd10HkUIwn946etaqtLq7/sjgrlKiv75FjD2ZfeUHLm/gHm0yck+Kv4fOuxpvCRi91zy/gx2+R4xUsfmaSJFYiMJZjMoabTySkYFd2MIwW2KwjnSk5PMnkfqREKAKAKAKAKAKAKAKAKAKAKAKAQ0Ay/EYkpxIYadHY4gK/GouEX2iSlKPTIhsNqJ1t0X/piqvw1L/tRZ+Iu/1P8AUeYtkGOoKYhxm1DqloA/OpxqhHpEJWTl2yXirCAtAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAf/9k='
    const {title, subtitle, description} = req.body
    if(!title || !subtitle || !description){
        res.status(400).json({
            message : " Please provide tittle, subttile, description hai"
        })
        return
        
    }
    
    await noteModel.create({
        title,
        subtitle,
        description,
        file
    })
    res.status(201).json({
        message : "Note Created !"
    })
    
}   catch (error) {
    console.log(error)
     return next(createHttpError(500, "Error while creating"))


    }
}

const listNotes = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const notes = await noteModel.find()
        res.status(200).json({
            message : "Hurry!! Notes fetched vayo haita ",
            data: notes
        })
    } catch(error){
        return next(createHttpError(500,"Error while fetching....."))
    }
}


const deleteNote = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const {id} = req.params
        await noteModel.findByIdAndDelete(id)
        res.status(200).json({
            message : "Notes delete vayo 😥 ",
            
        })
    } catch(error){
        return next(createHttpError(500,"Error while deleting....."))
    }
}

const listNote = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const {id} = req.params
        const note = await noteModel.findById(id)
        if (!note){
            return next(createHttpError(404, "Note not found with that id!"))
        }
        res.status(200).json({
            message : "Hurry!! Note fetched vayo haita ",
            data: note
        })
    } catch(error){
        return next(createHttpError(500,"Error aayo while fetching....."))
    }
}




export {createNote, listNote, listNotes, deleteNote}




