import React from 'react'
import '../Styles/Cards.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';


function Cards() {

    const [preprocessMessage, setPreprocessMessage] = useState('');
  const [mlmodelMessage, setMlmodelMessage] = useState('');

  

  return (
    <div className='cards'>
        <Card sx={{ maxWidth: 400,maxHeight: 450  , boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)', margin: '10px',borderRadius:'10px',
}}>
    <CardActionArea>
      <CardMedia
        component="img"
        width="500px"
        height="200px"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-VwxHzxOBwfeu7cBHXpg_9wA5gRKhsEHIBQ&usqp=CAU"
        alt="Preprocessing"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" fontWeight="bold" fontSize="1.6rem" >
          Data Preprocessing
        </Typography>
        <Typography variant="body2" color="#303030" fontSize="18px"  className="text">
          Preprocess the data by eliminating outliers, missing values, null values and other noises in the data.
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions sx={{ justifyContent: 'center' }}>
    <Link to="/preprocess">

      <Button component={Link} to="/preprocess" size="large"  variant="contained" 
        sx={{
          backgroundColor: 'green',
          color: 'black',
          fontWeight: 'bold', 
          fontSize: '18px', 
          height: '50px',

          '&:hover': {
            backgroundColor: 'green',
            color: 'black',
          },
        }}>
        Select
      </Button>
      </Link>
    </CardActions>
  </Card>
  <Card sx={{ maxWidth: 400,maxHeight: 450 , boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)', margin: '10px',borderRadius:'10px',}}>
      <CardActionArea>
        <CardMedia
          component="img"
          width="500px"
          height="200px"
          image="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxUUExMUFBQXFhQWGRoZFxkZGR0YGBscGRgYGRsgGxsaHiohGRwmHhcYIzMiJistMDAyGSA1OjUuOSovMC0BCgoKDw4PHBERHDEjISgtLy8vNy8wLy8vLy83Ly8vLy8vLy8vLy8vLS8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL//AABEIALABHwMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAUGAwIBB//EAEQQAAIBAgQDBgMFBQQJBQAAAAECEQADBBIhMQUTQQYiMlFhcUKBkSMzUqGxFHKywcIVYtHwFjRDU3OCkrPhJGOio9P/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAQID/8QAKBEBAQACAQMCBQUBAAAAAAAAAAECESEDEjFBYRMiUXGBBCMzkaEy/9oADAMBAAIRAxEAPwD9xpSlApSlApSlApSlApUHimOFq2WjM0HIkwXYAmB5bEk7AAk6A1TYvjN1bee5lw5IEKVa53m0X7XS2up1kGNfKg01IrK/201oi3cxCO4UNPJL511AbNbYKkwdCNCDuNauOH41ycl5BbualQGzKy9MrQJYDxL0PmIJbXVizpSlEKUpQKVU9piww10oSCACYMEoGBcA9GKBgPUis92Ww15WcIFsqAxIa0wBzMMkJKElQrd6NmA70TV0m+dNoXA6ivVfnPF8JdGIuMyFvtAzsuGuOrrkteGFborL49/aK3PA/wDV8P8A8K3/AACliS7TqUpUaKUpQKVS8ZtzctlrZdBbuiMrMucm3kzBVYjQP3oMa+esVbmGBi5YCknuAWbhLDujrbHek7CdBPnAaOlY3F8UWzdblqLQMKRkY3MuUPzBagE6nlj1PU9wyMLxm4hPNF0EIbhS6LRJRCM5RrGmZQZKmZMDSZq6Tum9NXSlKilKUoFKUoFKUoFKUoFKUoFKUoFKUoMjxdlfEXgt1bVwW0tM1w9wIczsAjEZi2ddVjwCW0AMT+2rz31WQSLhFu3k7pAJUXO8QSCpzhs+UyFEmDV7xXgzXrmbOmQqqvbuW+YjlGZlLDMsxmOn1nSK3ilq7YAu3bltrADLcBtsSocrBWbhJlwg3hdxpRKreKcJt3XW8WuoXDtd5qraASycrMYWVkMBpBKmZBE1dW8Gr27yAZbhIdG5jEFyv2ToSZXwkZf7pGqxNdaZpTNfa49oA3cQvd5VtgTBVwUdGKAFx+HMYyzUw4ZLrf8Ap+Vfuo2dr93vqjhfswOXAYg5TlWAACTDETJjjOY1c8stS3ieGkwmIFy2lxdnUMPZgCP1rvUPBYUWra21lsojfUnckzpJMn51IV5noR0NVHSoOM4gLbKpS62YMZS2zgZY0JUaEzp5wanVzLiQJEnYddN/1H1oMuOIXLnKa4Dyy9twoVSjBmAQKwYklGe22oGbIYFdu1/GGw4tG2AbhzwWBYZVAzCFILEkpAkbT0gzsThrVn7UWySHGUBjAa62SVVmyqZuGTpoT51E4xdt3EAv2DkBkFntrBAOobOCDlzbHaelTOW43t4q9PLHHKd/Mdez/G+chLKcytlOVWKnuq3rlPeGhPr1qlwHaBkuZAPsuYQilG0RrhTLn2Vw0whAiQkfFV3w3EIiBbVghASIVrZ1k5pOfU5gZkzNfODcNtMFvtbHOZmdidcrkkGBt3fCGAkgT1NXGWT5vKZ2ZW9nE3/i+pXJmj4SfUR/jNe1M6ig9Ury7QJr4rE9CPeP5Ggo+VzLt7MzkLcCqBcdVA5VpvCpAOrEyZOtcMHwi3cu3Gc3WNi7Fubtzu5rFomO9IP2j6j8UbQK44/AYzn3OTctJbuNnGYS2lu2pnuHqtVeGu4pTcIx2EGdgxIdTJyIk+DQQgq3TGMsu6n8UwgPNzXGFtLyWpZpZMy2HturPOZkvNPenR23gCvC4Avcto9207uLixaUW1CP3rz5c7E3GACzOhcmN5CWw19L2IwxvXbiuGDjl9wWgJ00MW/LrXfs/wAFu28QHc2iq2yO5My5EbqNIQ/UU2txlu2tpSlRopSlApSlApSlApSlApSqvjPFBaAGZFYgnM5i2iggF3MiQCygKDLFgNBLALSlfnnGOPsBcIuM65Dy7i3Cp5kxGW1lUAZlIBLGA0zUzhPaY98s4IzAIjNAKs2VIdxIuNrAYkEwJXer21nujb0rjh7yuquplWAIO2h9DtXao0V4ZARBEj1quFi9HjGy9eoPe+HWf512S3cGpYN3pjYZe9AmN9V+lVNuXFsIzAPby81QQufwMrRmV43UgT7geoMjhuHNu1bts2dkVVLREwImoy2L0AZ12APXWZJ28hEabmgsX/xr0/I6zpqCI8tztQ37LSuS+NvZf1auGEtuJzsDtEe59BGkD5V3Xxt7L+rVFdah4rh1q6Va5bS4VnKXUNExMSNNqmUoKfGcDtFRyrdq24ZGVuWNMrq3wwdQI361HxvBbl0AO1owZBCXARpGhF2f/IB3Aqxa1dloZYM5f7ukDprEA+5NeGw94/EB8ydMx02EmI1kbR61WLJfREwnDLqKER7QVdhy3MCZgTd0A6DYCANKseH4c27aqTmIkkgQCSSxgSYEnzriMPej7zWPcfH6DzT6Gu2EtXFLZ2DAxl9N/T1H0pTGSeiZXLD+FfYenTyrrXLD+FfYfpUbfbvT3H610rne6e4/WulBGxeGzjcgwQCDG4j/AArG/wCj+K5K28qAhVXMt0/DG3c9K2OJVz4SB3WG8QTEHbp/Ooz4W4dngQNJJIgHr1knX2G9al0xljKzOB4Biba5YV9ZlrxJ/g+fuTWtwGFyKASS2VVJJ/COnpqajnCXf951P0I2Pz6+1SsIjKDmMmd9fIee0mTA0E1LdmM0lUpSo2Urw7AAkmANSTtVTjOMpEWrtsk7vmBt2wTGZzMTrCrMsfQMQFzSq/g9q2tsLafOgLd7PnliSWkzvmJ06elWFApSlApSlArHdpsSVe4M1oSbast1oJthXdWUdftGYH9ytjWcfB2rxvNeQczMV7y+FFJFuCwhlOUv1Euwqzyzl4fnHFMGbeV2+1tEPADC5qSpVvtCAxAkZtTEDau/BMMWYuiqiqqwrAQW7/ehDAPSd96uG7PcwtfImycxXLqGUEy0jwq0Z/PWc2pFfOD4PNdUMxWwxjumCQWJtjNuqZbtoaQftEjQND4eMy7tnxsr0/h6n9c/22vZstyu/GbO85Zy5iczxOsBy4+VW9crFlUUKihVGwAgCvlxiJMCB66x1qNOtKVnu2LkW7cEjvdDHwmrOUyuptoaVl+yOIOa5bYmYDCTO2h/Vag9pMUzXnykwgA0MeU/m0Ve3nTHxONttXEWznLZtCAIjqJ1n51C7OMTh7ZJkwf4jVL2nxLPeW0hPcBJAO5IzH6KB9TUk5W5am2ur5VJ2Wxue1lJlkMesHUfzHyrr2g4kbNsZfG2i+kbn1jT601zpe6a2tppWSw3ALl5RcuXSGYSAQWMHadRHtXbgjX7d02nDNb2mCVGkghj0Pl600zM76xp6VlOK3D+22hJibek6b1qL3hb2P6UsamW9vdcrCkKATmIG8RPyrOdjLhPNkk6JuZ/FX3sa5PNkk+Dcz+OmmZnvXu0N9ScsNEMCdJkDcenvXasBwbibW7iszEodGBJOnn7jf61ou1Vz7EFTu66g+h8quiZyy1e0mszxFz+xWzJnuazrUXhvBHu21uc4rmnSCdiRvm9Kmjvu9SNfXqqLhnAmt3A5ulgJ0gjcR+I1eUrctfajYrELbQuxhR8yegAA1JJgADUkgV7zGTAGmmp67/zqFxZmmwq5czXYBZSwWLV15ABEnuxv1qKg4jFFiLd42bY0Y2uaGuXD8KMCogTuAWzREkTOf7V4y69rCi4UIuMLndQrBCjTV2kfaem1fecz3b5aM3OtAwIBymyswSYnLMSa5dqfusD+7/Tarn15+3fs6/pMt9fH7tR2Q+5+Y/7durwVR9kfuPmP+2lXgp0/wDifZOt/Jl96+0pSujmUpSg+VQ8VwSG7mu22uW3VZARrgD2nzISqgyTnOpGnLAnXW+pRLNqh8NcvKVYcu0wIZdDcYHQhiJVARI0kwd1NVXGODXGulLSjJcW4xYiVVobuyNRL3Cesrdvj8MXfEFuFkKbJ3j3ozGdvXuht4HeB6VIwSsEAbxS25n4iR+UUJ9HnhtpltW1ckuqKGJbOZAEy5ALa9YE13xHhb2Pr08utda8Osgg7HSivVZ7tp93b/f/AKTV06vBgrMGJB36daqe02EuXLdsKuZgZaP3T59Jqzyxn4qqDiziLLnRXtoT80yn8wDUW2haziLx3ZlH1fM36rVtxzhjvasZVJZFCsBvqo/Qj86Nwxxg8gU5ywYjr4h/ICtbcrjd1P4HdCYVWOyqxPyLGs/wXH21uveumCZjQnVjrttA0+dWF/D3hhEtLbOYk5hpoAxPn10qbwzglsWkFy2peJad5OsfLb5VOGtW616KPg2KW3iSEP2bkqOmhMrofIwKldtQZteUNH/x/wDFdeP8F0RrKagkELp6g/KPzqfjcAcRYQOMl0AHXo2xmOh/wq7nlO26sWlkgqpG0CPaK8DFJnKZlzj4Z11E7VmbN3GWlyC3mA0BjNA9CDt71J4Jwm5zDeveLUgHUyepjQabD9IqabmVvEiD2hQtilVTDHIAdoJOhkbVJfg+JAJN/SPxv/hXTiWAuNi0cKSgKSemh1rRXhKsPQ/pTaTDdu2Z7Ff7b2T+uvvYn/bf8n9dduymDuW+bzEKzliesZp/UU7KYN7fNzoVnLE9YzT+oq31TGXj8qbguA5tu+o8YCFD69/T2O1ebmPLYflN4kcZZ3y94R8j/nSrvsngnt8zmIVkLE9YzT+oqP2j4KzPzLS5s3iA6Hz+f+d6b5Z7b27j3xL/AFG1/wAlReG8LvvbVkvFVMwM7iNSNhpvVhjsG5wdtAhLjJK9dN6h4O5jLaKi2u6sxIk6kn8XrT0Wznn6LTg/Dr1ty1y6XUrAGZjrI173sfrV1VBw/FYo3FFy2AhnMYjoY+Lziri2H1krE6QDt6671muuOtcPVvdvf+lfrUTiVpibLIuY23LETBINu4mhOky4PyNTLaRPUnU1wxthnAyuUI1n5giddRptUVlrXA74uOci5blxXnOO6AyMQREk907V44zwPEXbeHUJbDWQBHM8WiAwcukZfzrRrw9gB9q8gjqYOUR+fWn7E8RzD9T5ADUnTXMfmPKmeMzx1TDK4ZTLGczl47O4N7VoLcADTqFOYCFVd4H4fzq2qJhsOyliWLAxAJJiBrv51LqSamo1crlba+0pSqhSlKBSlQ+JYwWrTXCJyjQDqSQFE9JJAmgl0rOcJ7TLcJV1ynvRlzOO4wVge7IgsuvXXaIrxiu1EXCiW8wUwSxKEkKHIAK6QrDUkSZ2GtXSbmttPXljGtebVwMoYbEAj2OtfMR4G/dP6VFeGdoJCyY0Egewqv47xF7NpXULmLAEHUCVJOxHUVb1n+2f3Kf8QfwvVnljLiVdYVyyIx3Kgn5gGoHaHHNathkiSwGonSGP8qm8O+6t/uL/AAiqntj9yv74/hak8mV+VxtYvGsoYW0IYAjbYiR8dWvCnvFTzlCtOkRtA8ies1T4RMZkTIyZcq5Zy7QI6eVXXDzcFubxGYSSRER8qtTD8qvtDxl7TqiZZiWkT7dfQ/lVtwzFcy0j9SNfQjQ/mKy2Bxdp7t27daAwIUEHZu70HRRHzqX2RxUNctEyPEp840P10P1pZwzjn8ztj+K3xfazbCnaARr4Ax1JA868YjimKtDNctJlmP8AOVjH0qLjzcGOY2wDc0yg7fdCeo6T1rxi8XeuvyLhS3JEyCJPTXWfTzppLlefK64nxUrYW7bjvEbid5n56V14FxPnW5MB10YD8iPQ/wAjUHtBhhbwqoNlKifrJqutg4Z7N0SbdxFzfNQWH9Q+Yprhq5WXlc8K4i9y9eRsuVCQsDXRiNdfIV84FxN7j3VfLCbQI6ka6+lROzbA4jEkGQSSD5gua89lPvL/APn4mpYTK8fl74Jx9nfJcyjN4SBGvkdev+d6mcX4i9u7ZRcuVyA0iT4gNNfWszgsCXtXLizntsDp5RrHqIn5VLxGP5tzCt8QYBh65119jvV1yzM7rloONcWFlRpmdvCP5n0qtbF43Ln5axvlgTHtOb5b144v/rtnNt3I/wCo/wA6t+K425by5LRuTMxOkRGw6yfpUat3vl54HxUX0JiGXRh012I9DB+lTbbtrKRBgd6ZHn6e1VfAeJm6zrywmUDb3I2irypW8buPFtp6Qeor3XKzu/739K11qNFKoX4y1xiuHTmAbv8AD0IIBIBGs6sCQQQGUg18PFL9rW9Z7kiXWBvpoudp+ZXyEkgUF/SuVi8rqGUypEg11oFKUoFKUoFZ7i3E7V0NhwZLtymOU5FmVbvEZSw1AGvfyrvWhrHYvs9ymNwuDZDhnAUrcFsOX8eaMqMZJgHKD11NiXfo8LdOHuXRZRiBpmKXL7QomM73x1nugdQT1NBhRin+0Qo1xGE5XtHMugLJzWW4NIKsNoBkaVE4xw48x8lstDMBnt4i4CpU7MgIbVj18x7d+GYNRcc3EZLQDsWy37WgncvGsHYevlVYlu9L7hXHrd3Ksw50iGyFhM5HIhxoSD1USOsWdwMZGgB0mTPrpG/zrM9nuzTW2t3HeIAOTLD6KVQXDmKyqtrlABYeWh1tStzfq+VT9pcG922q2xJDgnUDTKw6+4q5r5ULNzTN2jjVVVCJCgAar0Efir3xLCXrthFZRzA8kAgCAGA6x1FaGlXbPb7s3YONVVUIkKABquwEfirreGKezcVlXOxAEEDunxdfl86v64ozZmBjKAI3nWZn6U2dvuquGcCtrbUXEUvuxOup6fLao2L4QyXrdywgyiMwBA9DueoNaNvzrnYYlVLRJAJjb5TTdOyeFKOHXP23m5fs/OR/u8u2+9de0XCucoZB9ou3SR5T+Y+fnV1Si9s1pn8bhb93DKrL9oGE94agdZmKnNgM+HW0+hCKPOGCjX5GrOlNnbGc7NcMuWmuFxAIAGoM6+ldOz/Dnt3LzOsBttQZ1J6e9X1KbSYSaUfZnAXLSuLgiSI1B6HyqBe4C631a2oNvOrbgZe8CRB8q0t8sAMsTIGsxBIHTrXemzsmtKfjvCecAVOV12PQ+hjb3qDzMcBkyL5Z+7P8UflWlpTa3Dd2puz/AAlrOdnYFn3A2GpO/U61c19r4aiyamo4wwJiDOupI8h5Hyqv7SXGGHfKJLQseYJGZZ9RIn1q3qm7Ukfs12So8MF5Khs65cwXVhmiVGp20mivOKxIwtu2iobkS1yPHkUZrtzKoJdpI7oEkvpVVgbjXr5tvcfIxN25bJdSjJkC2gYym3lK51zQWRtCHYDPW+JnQFnYE20uXGdywFsE/aSYslmYysKG0KyNpPZ/i62puk54ziZkScmXM+uWY9SYgBjAN1wz3c6ans73Hv2ZJCNmHXRmuKBr6WwSerMxO9X9Z7s4Shdboy3bhLidmHiIHkQzOxSTlzwCQJrQ1GilKUClKUCq/jVl3sXVt+NlIGuWfMT8MiRPSZqwqDexhViMjEDqJPkT08if+k0Ss92c4ZeRmIHJSCCGRO8SwKgKhiEUFZ65uu9RONcHxD3ySnNB8DQgEZAAJLZrWVwXlfMESdK1X7a3em20gDaTPegxp5EH6+VeP7RaPummAfn1Ex7Vr3Z1NaTrSkKATJAEnaTGprrUPDYosxBQqI6z6ekdfPoamVltxv3gis7GFUFmPkAJJ+lVY7Qp/u7n1t//AKVN4tYNyzeRd3tuo92UgfrWUOAxGWORcBiJDWZGm4m5H1FaxkvljPKzxF+vHlJA5bj1JtwP/srpheMo7qmVlLGFJykEgFo7rGNFY6+VZSxg75d4tXmyNlZS2HABNu2QNGBiDm33c9AALbhOBu8y2XtNbVGzEsyGfs7iQAjEzLj6GrZNMzLK3mNVXJfE3sP1autcl8Tew/Vqw6utc7HhX2H6V0rlY8C+w9OlBX8V4ulkoCCWaSAIEBYBJLEACWUeZnbQxJwOLF1Q6yAZBB3BBIIMSNCDqCQdwSKqO1GHtM1su7rc7wUIFYsvdLSHBXKDlOYxBgTrBprOLVLZt23vF1deYUJi4jXAGMN4LpzFSlqHDRAgrVZ3dt1SsxhsfyA9xku8gKMxysArS2q27pDnulQcoMmIBOapfC+0du6wXKyE6DNHkTBykxt7bCZIFZuUl1by6Y4ZZY90l1F9SlKrLnf2+a/xCulcr2w91/iFdaCBxLHi0ASCSTAA3PU/kDA6mBuRVPxTtbbtuqoBclVYtmyqA/gEhTJI1jyKn4hU/ji2mCrcuBGBDA/FEwdvPoejBTuorKce4LaLi5YuooPLVkNtrg0ZUDiGGXKsSPJBtFc+r3dvy+XboTp3L9y6jUt2gthVYgyfEPwwTmM9QArNI3UA/Es3NZS3w7DC3aU3Zy6M2vf/ABiPhBDZfRSBuqldPZuKyhlIKkaEaiK3Pdyut8OlVHajBvdw7pbXM+a2wEgTkuo51Okwp3q3qLjL7LlyqWk6wJhRuffyFVm+GF/0exGYNyjpcLyHQGGVQVBDSCDvsNNzpVt2e4JdS5mvJICuMzMLhh8vd1JPnPT3q5XG3NJtncTAMZepHrBXTfRq9HFvAOX4JPcYkMIlQNJksI/db5aZmkPEcKuAcpCOWSCjk9+yR5dWj4fLYyKv6gYG87MwcAAARCMs6KTq3SSRHpU+pWpJ6PtKUqKUpSgUpSgUpSgUpSggcRxJQIEAZ3bKsmFHdLEmNYAU6DcwNJkU3C1XIBeuM2W2LnOF26iuoHeYqXOQjQnUiGGu4F5jsILgAJKlTmVljMpgiRII2JEEEEE1Vca4WRhsUFL3blyy6iYzHutlVQoCjUnpJnUnSluoSW5SeiPw39nNy8OaZa6uT7a4M32Vkad/XvAj5RUQcTi9No90F0VXe43NK6HVnhBmUgGDprsYqq4JgL3OUm1cAzoZZCoUK6E6n90mtRf7Mozuwu3EV2LFFyBZPiglSyyZOh3JNc+jncpvKadf1XSnTy1hl3LjD3luojqTlYBhupgjr1G9dlQDb/H9a82kCgKoAAAAA0AA0AFda6ORXMWh6/Ux9JiulKDN9qsEj8tmuLbbVAGQ3Q4JDEZFIYkZQZB01mqd7LW1tXVuqyrdy4fmEIxe64R30HftksV5cSElgxOUC87R8Je81trZWVVlKszJoxRpDqCVMoNI1+VSeGcHS3bZXVHd83MbKO9mJMHqVExr5VfRnXNVXFFvYm2+HhCzAOtyGtKpt3R4kbMxGZQQQYYTtAJidnuyt23eD3eWqhsxCMzl2AESSq5QMqnrOWtXg8ClucggmJJJZjG0sxJIEmBOk1Lrll0scsplfMd+n188MLhLxfL7SlK6OTyyyINfESPP5kn9a90oMd2ilcSzZLhVrVsArbdxKvekdxTB7y7+dVj33nRLkd3exfnfvfB5RHrWg44q8w80JlhOWbq57XiPNAEwLhXQE+awGhhUAoP9qoFsxyeehZAnMbMsMRkuFYgHWCgg5WFdJlw4ZYy21XpiSFGZLubrFi8BPpKVsuBqRaWQQSXaCCDDOzCQdRoRodazq29ZurCGOTzbbXFFvmNmTKT3LjLtOsG3o2RlrQ8EUi0JDKJbKGkMEzHICDqO7EA6gQDqKzldtdOSWrKlKVl1KUpQKUpQKUpQKUpQKUpQKUpQKUpQQP26JkfijqSVjSI8RnbWuf8AaJn7s7r117w10jcHSOtWVKqaqtHEDAJtxmmJPl56aTsPWK+niJ1IQkCfOTBUCBGshgfr5VY0oav1QcPjCzZchGh726mCdjHt9fSp9fK+1CFKUoqr4qwDW5LDXSNvEgg67GY+f1rlAyLq2UqCYUA6Su2b/wBz8hWkivOQeQq7ZuO6z6Xoghn6AAqOhJHdDTMq+o01iNKn/wBrLBOVtAD06hTprrowny671Y5R5UKDyFNklj0DX2lKjRSlKCvTiSnaSZIG2sEba7EEGvB4sg3VhpPQ9FOsHoGH51Y5R5Uyjyqpqq25xhF3Vvy/vDz01UjXzFdl4ipZRB7xjpoYG+vrUvKPKmUeQoar3SlKilKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoP/Z"
          alt="Machine learning models"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" fontWeight="bold" fontSize="1.6rem" >
            Machine Learning algorithms
          </Typography>
          <Typography variant="body2" color="#303030" fontSize="18px" className="text">
            Apply regression, classification, clustering and other machine learning algorithms on the dataset.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Link to="/mlmodels">
      <Button size="large"  variant="contained" 
        sx={{
          backgroundColor: 'green',
          color: 'black',
          fontWeight: 'bold', 
          fontSize: '18px', 
          height: '50px',

          '&:hover': {
            backgroundColor: 'green',
            color: 'black',
          },
        }}>
        Select
      </Button>
      </Link>
    </CardActions>
    </Card>
    {preprocessMessage && <h1 style={{ color: 'white', fontSize: '25px', }}>{preprocessMessage}</h1>}
      {mlmodelMessage && <h1 style={{ color: 'white', fontSize: '25px', }}>{mlmodelMessage}</h1>}
  </div>
  )
}

export default Cards