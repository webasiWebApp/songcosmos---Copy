import React from "react";

import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import "../../css/membership.css";

import benifit from "../../image/benifit.png";

import { Box, Button , Select,Grid} from '@chakra-ui/react';

export default function Membership(){

    const [classicMemType,SetClassicMemType] = React.useState("MclaD");

    return(
        <section className="membership-page">
            <Navbar/>

                <div className="container">
                    <h1 className="title"> All <span>Membership</span> Plans </h1>




                        <Grid className="membership-row" templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={4}>
                        <Box w={{base: "100%", lg: "33.33%"}} display={"none"}>
                            <div className="packge-card classic-packege"> 
                                <h2>CLASSIC</h2>
                                
                                <h3><sup style={{"fontSize":"16px",fontWeight:"bolder"}}> LKR </sup>6000<span className="membership-time">/ one-time</span></h3>

                                
                                <Link className="join-us-btn" to={`/app/checkout?id=${classicMemType}&type=membership&isCart=no&lType=none&mem=${classicMemType}`} target="_blank"  >
                                    <Button type="submit" colorScheme="orange"  bg="#EB5C27" color="#FCFCFC" style={{"width":"70%","margin":"0px 0px 15px 0px"}}>
                                        JOIN WITH US
                                </Button>
                                </Link>
                                <div className="benifit">
                                    <p>IPI Registration</p>
                                    <p>Song Registration</p>
                                    <p>25% Music Distribution Commission</p>
                                    <p>25% Music Publishing Commission</p>
                                    <p>2.5% Pearlbay Store Discount</p>
                                    <p>5% Production Discount</p>
                                    <p>Personal Distribution  account </p>
                                    <p>5% Pearlbay Studio Recording Discount </p>
                                    <p>5% Discount on Mix and Mastering </p>
                                    <p>5% Production Discount </p>
                                    <p>5% Pearlbay Institute Discount </p>
                                    <p>Quarterly Royalty Payment (Publishing) </p>
                                    <p>Access to SONGCOSMOS Annual Profit share (15%)* </p>
                                    <p>10% Discount on Licencing Pearlbay Publishing Catalogue /parner catolog  </p>
                                
                                    

                                    <div className="select">
                                    <Select
                                        border="1px"
                                        borderColor="#EB5C27"
                                        bg="transparent"
                                        color="#EB5C27"
                                        width="100%"
                                        onChange={(event)=>{SetClassicMemType(event.target.value)}}
                                        >
                                        <option bg="transparent" value="MclaD">Music Distribution </option>
                                        <option bg="transparent" value="MclaP">Music Publishing</option>
                                    </Select>
                                </div>
                                </div>

                                
                            </div>
                        </Box>
                        <Box w={{base: "100%", lg: "33.33%"}} display={"none"}>
                            
                        <div className="packge-card bronze-packege"> 

                            
                                <h2>BRONZE</h2>
                                
                                <h3><sup style={{"fontSize":"16px",fontWeight:"bolder"}}> LKR </sup>12,000<span className="membership-time">/ Per Annum</span></h3>

                                <Link className="join-us-btn" to="/app/checkout?id=Mbro&type=membership&isCart=no&lType=none&mem=Mbro" target="_blank" >
                                    <Button type="submit" colorScheme="orange"  bg="#EB5C27" color="#FCFCFC" style={{"width":"70%","margin":"0px 0px 15px 0px"}}>
                                        JOIN WITH US
                                </Button>
                                </Link>

                                <div className="benifit">
                                    <p>IPI Registration</p>
                                    <p>Song Registration</p>
                                    <p>20% Music Distribution Commission</p>
                                    <p>20% Music Publishing Commission</p>
                                    <p>3.5% Pearlbay Store Discount</p>
                                    <p>7.5% Production Discount</p>
                                  
                                    <p>Personal Distribution  account </p>
                                    <p>Pearlbay Studio Recording 10% Discount </p>
                                    <p>1 Free Digital Mix and Mastering per Year </p>
                                    <p>10% Discount on Mix and Mastering </p>
                                    <p>7.5 % Production Discount </p>
                                    <p>6% Pearlbay Institute Discount </p>
                                    <p>Quarterly Royalty Payment (Publishing) </p>
                                    <p>Access to SONGCOSMOS Annual Profit share (15%)* </p>
                                    <p>20% Discount on Licencing Pearlbay Publishing Catalogue / parner Catalogue </p>
                                </div>
                            </div>


                        </Box>
                        <Box w={{base: "100%", lg: "33.33%"}}>
                            <div className="packge-card silver-packege"> 
                            <div className="recomment" style={{display:"none"}}>RECOMMEND</div>
                                <h2>LIFE SILVER</h2>
                                
                                <h3 ><sup style={{"fontSize":"16px",fontWeight:"bolder"}}> $ </sup>30<span className="membership-time"> for the Life</span></h3>

                                <Link className="join-us-btn" to="/app/checkout?id=Msil&type=membership&isCart=no&lType=none&mem=Msil" target="_blank" >
                                    <Button type="submit" colorScheme="orange"  bg="#EB5C27" color="#FCFCFC" _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} style={{"width":"70%","margin":"0px 0px 15px 0px"}}>
                                        JOIN Now!
                                </Button>
                                </Link>

                                <div className="benifit">
                                    <p>IPI Registration (Integrated Pub Admin)</p>
                                    <p>Unlimited Music Publishing</p>
                                    <p>Unlimited Music Distribution</p>
                                    <p>Keep 90% of Music Distribution Revenue</p>
                                    <p>Keep 85% of Music Publishing Revenue</p>
                                    <p>Individual Distribution Account</p>
                                    <p>Individual Publishing Account</p>
                                    <p>Monthly Payout </p>
                                    <p>Performance Analysis </p>
                                    <p>SONGCOSMOS® Annual Profit Share (15%) </p>
                                    <p>10% Discount on Licencing PEARLBAY® Publishing Catalogue in Sri Lanka </p>
                                    {/* <p>7% Pearlbay Institute Discount </p> */}
                                    <p>2.5% PEARLBAY® Music Store Pro Audio Discount </p>
                                    <p>5% Off on Other PEARLBAY® Services </p>
                                    
                                    {/* <p>30% Discount on Licencing Pearlbay Publishing Catalogue</p> */}
                                </div>
                            </div>
                        </Box>


                        <Box w={{base: "100%", lg: "33.33%"}}>
                            <div className="packge-card gold-packege"> 
                            
                                <h2>ANNUAL GOLD</h2>
                                
                                <h3><sup style={{"fontSize":"16px",fontWeight:"bolder"}}> $</sup>50<span className="membership-time"> / Per Annum</span></h3>

                                

                                <Link className="join-us-btn" to="/app/checkout?id=Mgold&type=membership&isCart=no&lType=none&mem=Mgold" target="_blank" >
                                    <Button type="submit" colorScheme="orange"  bg="#EB5C27" color="#FCFCFC" _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} style={{"width":"70%","margin":"0px 0px 15px 0px"}}>
                                        JOIN Now!
                                </Button>
                                </Link>

                                <div className="benifit">
                                    <p>IPI Registration (Integrated Pub Admin)</p>
                                    <p>Unlimited Music Publishing</p>
                                    <p>Unlimited Music Distribution</p>
                                    <p>Keep 90% of Music Distribution Revenue</p>
                                    <p>Keep 90% of Music Publishing Revenue</p>
                                    <p>Individual Distribution Account</p>
                                    <p>Individual Publishing Account </p>
                  
                                    <p>Monthly Payouts</p>
                                    <p>Performance Analysis </p>
                                    <p>SONGCOSMOS® Annual Profit Share (15%) </p>
                                    <p>20% Discount on Licencing PEARLBAY® Publishing Catalogue in Sri Lanka</p>
                                    <p>3% PEARLBAY® Music Store Pro Audio Discount </p>
                                    <p>10 % Off on Other PEARLBAY® Services  </p>
                              
                                </div>

                                
                            </div>
                        </Box>
                        <Box w={{base: "100%", lg: "33.33%"}}>
                            
                            <div className="packge-card platinum-packege"> 

                         
                                <h2>ANNUAL PLATINUM</h2>
                                
                                <h3><sup style={{"fontSize":"16px",fontWeight:"bolder"}}> $ </sup>100<span className="membership-time"> / Per Annum</span></h3>

                                <Link className="join-us-btn" to="/app/checkout?id=Mpla&type=membership&isCart=no&lType=none&mem=Mpla" target="_blank" >
                                    <Button type="submit" colorScheme="orange"  bg="#EB5C27" color="#FCFCFC" _hover={{color: "#EB5C27",bg: "white",transition:"0.56s ease"}} style={{"width":"70%","margin":"0px 0px 15px 0px"}}>
                                        JOIN Now!
                                </Button>
                                </Link>

                                <div className="benifit">
                                    <p>IPI Registration (Integrated Pub Admin)</p>
                                    <p>Unlimited Music Publishing</p>
                                    <p>Unlimited Music Distribution</p>
                                    <p>Keep 90% of Music Distribution Revenue</p>
                                    <p>Keep 90% of Music Publishing Revenue</p>
                                    <p>Individual Distribution Account</p>
                                    <p>Individual Publishing Account </p>
                               
                                    <p>Monthly Payout </p>
                                    <p>Performance Analysis </p>
                                    <p>SONGCOSMOS® Annual Profit Share (15%) </p>
                                    <p>30% Discount on Licencing PEARLBAY® Publishing Catalogue in Sri Lanka </p>
                                    <p>3.5% PEARLBAY® Music Store Pro Audio Discount</p>
                                    <p>15% Off on Other PEARLBAY® Services</p>

                                </div>
                            </div>


                        </Box>
                </Grid>




                {/* <Grid className="membership-row" style={{"marginTop":"50px"}} templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={4}>

                       
                </Grid> */}


                <div className="compare-table" style={{display:"none"}}>

                    <h2  >Compare <span> packages </span> for what is a better</h2>

                    
                    <img src={benifit} alt="Benifit" className="benifit-image"/>

                </div>

            
                </div>

            <Footer/>
        </section>
    )
}